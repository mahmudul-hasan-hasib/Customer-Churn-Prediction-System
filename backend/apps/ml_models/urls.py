from rest_framework.routers import SimpleRouter
from .views import TrainedModelViewSet

router = SimpleRouter()
router.register("", TrainedModelViewSet, basename="ml-models")

urlpatterns = router.urls