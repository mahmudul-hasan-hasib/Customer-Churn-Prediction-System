from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import PredictionInputSerializer
from .services import predict_churn


class PredictChurnAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PredictionInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = predict_churn(serializer.validated_data)
        return Response(result, status=status.HTTP_200_OK)