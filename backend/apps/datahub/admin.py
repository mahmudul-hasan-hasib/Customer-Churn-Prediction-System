from django.contrib import admin
from .models import DatasetUpload


@admin.register(DatasetUpload)
class DatasetUploadAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "status",
        "row_count",
        "column_count",
        "uploaded_at",
    )
    search_fields = ("name",)
    list_filter = ("status",)