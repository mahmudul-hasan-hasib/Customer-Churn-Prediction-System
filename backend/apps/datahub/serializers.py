from rest_framework import serializers
from .models import DatasetUpload


class DatasetUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetUpload
        fields = ['id', 'name', 'file', 'uploaded_at', 'status', 'row_count', 'column_count', 'error_message']
        read_only_fields = ['id', 'uploaded_at', 'row_count', 'column_count', 'error_message']
