from django.db import models
from django.utils.crypto import get_random_string


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

    PAYMENT_METHOD_CHOICES = [
        ("Electronic Check", "Electronic Check"),
        ("Mailed Check", "Mailed Check"),
        ("Bank Transfer", "Bank Transfer"),
        ("Credit Card", "Credit Card"),
    ]

    INTERNET_SERVICE_CHOICES = [
        ("DSL", "DSL"),
        ("Fiber Optic", "Fiber Optic"),
        ("None", "None"),
    ]

    customer_code = models.CharField(
        max_length=50,
        unique=True,
        blank=True,
    )

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, blank=True, null=True)
    phone = models.CharField(max_length=30, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    joined_date = models.DateField(blank=True, null=True)

    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    tenure = models.PositiveIntegerField()
    usage_frequency = models.PositiveIntegerField()
    support_calls = models.PositiveIntegerField(default=0)
    payment_delay = models.PositiveIntegerField(default=0)

    subscription_type = models.CharField(max_length=20, choices=SUBSCRIPTION_CHOICES)
    contract_length = models.CharField(max_length=20, choices=CONTRACT_CHOICES)

    payment_method = models.CharField(
        max_length=30,
        choices=PAYMENT_METHOD_CHOICES,
        blank=True,
        null=True,
    )
    paperless_billing = models.BooleanField(default=False)

    monthly_charges = models.FloatField(default=0.0)
    total_spend = models.FloatField()
    internet_service = models.CharField(
        max_length=20,
        choices=INTERNET_SERVICE_CHOICES,
        blank=True,
        null=True,
    )
    additional_services = models.JSONField(default=list, blank=True)

    last_interaction = models.PositiveIntegerField()

    churn_prediction = models.BooleanField(default=False)
    churn_probability = models.FloatField(default=0.0)
    risk_level = models.CharField(max_length=10, choices=RISK_CHOICES, default="low")
    prediction_confidence = models.FloatField(default=0.0)
    model_version = models.CharField(max_length=20, default="v1.0.0")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.customer_code:
            while True:
                code = f"CUS-{get_random_string(6).upper()}"
                if not Customer.objects.filter(customer_code=code).exists():
                    self.customer_code = code
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.customer_code})"


class SupportHistory(models.Model):
    STATUS_CHOICES = [
        ("Resolved", "Resolved"),
        ("Pending", "Pending"),
        ("Open", "Open"),
    ]

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="support_history",
    )
    date = models.DateField()
    issue = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Resolved")
    satisfaction = models.PositiveIntegerField(default=5)

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return f"{self.customer.name} - {self.issue}"


class RetentionAction(models.Model):
    PRIORITY_CHOICES = [
        ("high", "High"),
        ("medium", "Medium"),
        ("low", "Low"),
    ]

    IMPACT_CHOICES = [
        ("High", "High"),
        ("Medium", "Medium"),
        ("Low", "Low"),
    ]

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="retention_actions",
    )
    action = models.CharField(max_length=255)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES)
    impact = models.CharField(max_length=20, choices=IMPACT_CHOICES)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.customer.name} - {self.action}"