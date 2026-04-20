from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import TrainedModel
from .serializers import TrainedModelSerializer
from apps.datasets.models import DatasetUpload
from apps.predictions.ml.training import train_model_from_dataset


class TrainedModelViewSet(viewsets.ModelViewSet):
    queryset = TrainedModel.objects.all().order_by("-trained_at")
    serializer_class = TrainedModelSerializer

    @action(detail=False, methods=["post"], url_path="retrain/(?P<dataset_id>[^/.]+)")
    def retrain(self, request, dataset_id=None):
        try:
            dataset = DatasetUpload.objects.get(id=dataset_id)

            version = f"churn_model_v{TrainedModel.objects.count() + 1}"

            model_instance = TrainedModel.objects.create(
                version=version,
                dataset=dataset,
                status="training",
            )

            try:
                train_model_from_dataset(dataset, model_instance)
            except Exception as e:
                model_instance.status = "failed"
                model_instance.error_message = str(e)
                model_instance.save()
                return Response(
                    {"detail": "Training failed", "error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return Response(
                TrainedModelSerializer(model_instance).data,
                status=status.HTTP_201_CREATED,
            )

        except DatasetUpload.DoesNotExist:
            return Response(
                {"detail": "Dataset not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=True, methods=["post"], url_path="activate")
    def activate_model(self, request, pk=None):
        model_instance = self.get_object()

        with transaction.atomic():
            TrainedModel.objects.update(is_active=False)
            model_instance.is_active = True
            model_instance.save()

        return Response(
            {"detail": f"{model_instance.version} is now active"},
            status=status.HTTP_200_OK,
        )