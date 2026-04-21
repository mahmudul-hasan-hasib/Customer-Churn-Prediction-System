from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static


def home(request):
    return JsonResponse({
        "message": "Customer Churn API is running"
    })


urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),
    path("api/predictions/", include("apps.predictions.urls")),
    path("api/customers/", include("apps.customers.urls")),
    path("api/dashboard/", include("apps.dashboard.urls")),
    path("api/analytics/", include("apps.analytics.urls")),
    path("api/datasets/", include("apps.datasets.urls")),
    path("api/ml-models/", include("apps.ml_models.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)