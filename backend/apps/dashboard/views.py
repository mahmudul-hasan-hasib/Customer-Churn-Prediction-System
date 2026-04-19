from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .services import (
    get_dashboard_summary,
    get_segmentation_data,
    get_recent_activity,
)


class DashboardSummaryAPIView(APIView):
    def get(self, request, *args, **kwargs):
        data = get_dashboard_summary()
        return Response(data, status=status.HTTP_200_OK)


class DashboardSegmentationAPIView(APIView):
    def get(self, request, *args, **kwargs):
        data = get_segmentation_data()
        return Response(data, status=status.HTTP_200_OK)


class DashboardRecentActivityAPIView(APIView):
    def get(self, request, *args, **kwargs):
        data = get_recent_activity()
        return Response(data, status=status.HTTP_200_OK)