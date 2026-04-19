from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .services import (
    get_dashboard_summary,
    get_segmentation_data,
    get_recent_activity,
    get_churn_trend_data,
    get_retention_performance,
)


class DashboardSummaryAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(get_dashboard_summary(), status=status.HTTP_200_OK)


class DashboardSegmentationAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(get_segmentation_data(), status=status.HTTP_200_OK)


class DashboardRecentActivityAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(get_recent_activity(), status=status.HTTP_200_OK)


class DashboardChurnTrendAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(get_churn_trend_data(), status=status.HTTP_200_OK)


class DashboardRetentionPerformanceAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(get_retention_performance(), status=status.HTTP_200_OK)