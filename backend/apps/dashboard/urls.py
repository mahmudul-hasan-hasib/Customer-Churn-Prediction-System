from django.urls import path
from .views import (
    DashboardSummaryAPIView,
    DashboardSegmentationAPIView,
    DashboardRecentActivityAPIView,
    DashboardChurnTrendAPIView,
    DashboardRetentionPerformanceAPIView,
)

urlpatterns = [
    path("summary/", DashboardSummaryAPIView.as_view(), name="dashboard-summary"),
    path("segmentation/", DashboardSegmentationAPIView.as_view(), name="dashboard-segmentation"),
    path("recent-activity/", DashboardRecentActivityAPIView.as_view(), name="dashboard-recent-activity"),
    path("churn-trend/", DashboardChurnTrendAPIView.as_view(), name="dashboard-churn-trend"),
    path("retention-performance/", DashboardRetentionPerformanceAPIView.as_view(), name="dashboard-retention-performance"),
]