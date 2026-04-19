from django.db import models


class Customer(models.Model):
    GENDER_CHOICES = [
        ("Female", "Female"),
        ("Male", "Male"),
    ]

    SUBSCRIPTION_CHOICES = [
        ("Standard", "Standard"),
        ("Basic", "Basic"),
        ("Premium", "Premium"),
    ]

    CONTRACT_CHOICES = [
        ("Annual", "Annual"),
        ("Monthly", "Monthly"),
        ("Quarterly", "Quarterly"),
    ]

    RISK_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, blank=True, null=True)

    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    tenure = models.PositiveIntegerField()
    usage_frequency = models.PositiveIntegerField()
    support_calls = models.PositiveIntegerField(default=0)
    payment_delay = models.PositiveIntegerField(default=0)
    subscription_type = models.CharField(max_length=20, choices=SUBSCRIPTION_CHOICES)
    contract_length = models.CharField(max_length=20, choices=CONTRACT_CHOICES)
    total_spend = models.FloatField()
    last_interaction = models.PositiveIntegerField()

    churn_prediction = models.BooleanField(default=False)
    churn_probability = models.FloatField(default=0.0)
    risk_level = models.CharField(max_length=10, choices=RISK_CHOICES, default="low")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name