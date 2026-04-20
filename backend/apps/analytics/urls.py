from django.urls import path
from .views import (
    FeatureImportanceAPIView,
    ChurnDistributionAPIView,
    ContractChurnAnalysisAPIView,
    ModelMetricsAPIView,
    RiskOverviewAPIView,
    AdminOverviewAPIView,
)

urlpatterns = [
    path("feature-importance/", FeatureImportanceAPIView.as_view(), name="feature-importance"),
    path("churn-distribution/", ChurnDistributionAPIView.as_view(), name="churn-distribution"),
    path("contract-churn/", ContractChurnAnalysisAPIView.as_view(), name="contract-churn"),
    path("risk-overview/", RiskOverviewAPIView.as_view(), name="risk-overview"),
    path("admin-overview/", AdminOverviewAPIView.as_view()),
      path("model-metrics/", ModelMetricsAPIView.as_view()),
]