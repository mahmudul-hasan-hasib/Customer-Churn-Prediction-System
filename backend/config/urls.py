from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

def home(request):
    return JsonResponse({
        "message": "Customer Churn API is running"
    })


urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),
    path("api/auth/", include("apps.caccounts.urls")),
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/predictions/", include("apps.predictions.urls")),
    path("api/customers/", include("apps.customers.urls")),
    path("api/dashboard/", include("apps.dashboard.urls")),
    path("api/analytics/", include("apps.analytics.urls")),
    path("api/datahub/", include("apps.datahub.urls")),
    path("api/ml-models/", include("apps.ml_models.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)