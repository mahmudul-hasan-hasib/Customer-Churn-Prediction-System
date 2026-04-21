from rest_framework.routers import DefaultRouter
from .views import DatasetUploadViewSet

router = DefaultRouter()
router.register("", DatasetUploadViewSet, basename="datahub")

urlpatterns = router.urls