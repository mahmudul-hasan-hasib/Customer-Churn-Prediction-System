from django.contrib import admin
from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "email",
        "tenure",
        "subscription_type",
        "contract_length",
        "churn_probability",
        "risk_level",
        "created_at",
    )
    search_fields = ("name", "email")
    list_filter = ("risk_level", "subscription_type", "contract_length")