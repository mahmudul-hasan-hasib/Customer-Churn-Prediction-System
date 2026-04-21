from django.db import models


class DatasetUpload(models.Model):
    STATUS_CHOICES = [
        ("uploaded", "Uploaded"),
        ("processing", "Processing"),
        ("completed", "Completed"),
        ("failed", "Failed"),
    ]

    name = models.CharField(max_length=255)
    file = models.FileField(upload_to="datasets/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="uploaded")
    row_count = models.PositiveIntegerField(default=0)
    column_count = models.PositiveIntegerField(default=0)
    error_message = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return self.name