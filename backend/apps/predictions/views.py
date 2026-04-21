from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import PredictionInputSerializer
from .services import predict_churn


class PredictChurnAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PredictionInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            result = predict_churn(serializer.validated_data)
            return Response(result, status=status.HTTP_200_OK)

        except FileNotFoundError as e:
            print("Prediction FileNotFoundError:", str(e))
            return Response(
                {
                    "detail": "Prediction pipeline/model file is missing.",
                    "error": str(e),
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        except Exception as e:
            print("Prediction Exception:", repr(e))
            return Response(
                {
                    "detail": "Prediction failed.",
                    "error": str(e),
                    "exception_type": e.__class__.__name__,
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )