from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .services import (
    get_feature_importance,
    get_churn_distribution,
    get_contract_churn_analysis,
    get_risk_overview,
    get_admin_overview,
    get_model_metrics,
)


class FeatureImportanceAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(get_feature_importance(), status=status.HTTP_200_OK)


class ChurnDistributionAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(get_churn_distribution(), status=status.HTTP_200_OK)


class ContractChurnAnalysisAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(get_contract_churn_analysis(), status=status.HTTP_200_OK)


class RiskOverviewAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(get_risk_overview(), status=status.HTTP_200_OK)


class AdminOverviewAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(get_admin_overview(), status=status.HTTP_200_OK)


class ModelMetricsAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(get_model_metrics(), status=status.HTTP_200_OK)