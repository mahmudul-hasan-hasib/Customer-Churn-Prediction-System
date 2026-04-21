import pandas as pd
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import DatasetUpload
from .serializers import DatasetUploadSerializer


class DatasetUploadViewSet(viewsets.ModelViewSet):
    queryset = DatasetUpload.objects.all().order_by("-uploaded_at")
    serializer_class = DatasetUploadSerializer
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        dataset = serializer.save()

        try:
            df = pd.read_csv(dataset.file.path)
            dataset.row_count = len(df)
            dataset.column_count = len(df.columns)
            dataset.status = "completed"
            dataset.save()
        except Exception as e:
            dataset.status = "failed"
            dataset.error_message = str(e)
            dataset.save()

        return Response(
            DatasetUploadSerializer(dataset).data,
            status=status.HTTP_201_CREATED
        )