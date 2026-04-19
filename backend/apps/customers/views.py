from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Customer
from .serializers import CustomerSerializer, CustomerDetailSerializer
from apps.predictions.services import predict_churn


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()

    def get_serializer_class(self):
        if self.action in ["retrieve"]:
            return CustomerDetailSerializer
        return CustomerSerializer

    def get_queryset(self):
        queryset = Customer.objects.all().order_by("-created_at")

        search = self.request.query_params.get("search")
        risk = self.request.query_params.get("risk")
        contract = self.request.query_params.get("contract")

        if search:
            queryset = queryset.filter(name__icontains=search)

        if risk:
            queryset = queryset.filter(risk_level__iexact=risk)

        if contract:
            queryset = queryset.filter(contract_length__iexact=contract)

        return queryset

    @action(detail=True, methods=["post"], url_path="predict")
    def predict_customer(self, request, pk=None):
        customer = self.get_object()

        input_data = {
            "age": customer.age,
            "gender": customer.gender,
            "tenure": customer.tenure,
            "usage_frequency": customer.usage_frequency,
            "support_calls": customer.support_calls,
            "payment_delay": customer.payment_delay,
            "subscription_type": customer.subscription_type,
            "contract_length": customer.contract_length,
            "total_spend": customer.total_spend,
            "last_interaction": customer.last_interaction,
        }

        result = predict_churn(input_data)

        customer.churn_prediction = bool(result["prediction"])
        customer.churn_probability = result["probability"]
        customer.risk_level = result["risk_level"]
        customer.save()

        return Response(
            {
                "id": customer.id,
                "name": customer.name,
                "prediction": customer.churn_prediction,
                "probability": customer.churn_probability,
                "risk_level": customer.risk_level,
            },
            status=status.HTTP_200_OK,
        )