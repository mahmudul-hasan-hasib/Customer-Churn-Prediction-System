from django.db import models
from apps.datasets.models import DatasetUpload


class TrainedModel(models.Model):
    STATUS_CHOICES = [
        ("training", "Training"),
        ("ready", "Ready"),
        ("failed", "Failed"),
    ]

    version = models.CharField(max_length=50, unique=True)
    dataset = models.ForeignKey(
        DatasetUpload,
        on_delete=models.CASCADE,
        related_name="trained_models"
    )
    model_file = models.FileField(upload_to="model_versions/")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="training")

    accuracy = models.FloatField(default=0.0)
    precision = models.FloatField(default=0.0)
    recall = models.FloatField(default=0.0)
    f1_score = models.FloatField(default=0.0)

    is_active = models.BooleanField(default=False)
    trained_at = models.DateTimeField(auto_now_add=True)
    error_message = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.version