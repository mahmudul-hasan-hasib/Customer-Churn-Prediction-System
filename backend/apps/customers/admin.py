from django.contrib import admin
from .models import Customer, SupportHistory, RetentionAction


class SupportHistoryInline(admin.TabularInline):
    model = SupportHistory
    extra = 0


class RetentionActionInline(admin.TabularInline):
    model = RetentionAction
    extra = 0


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer_code",
        "name",
        "email",
        "tenure",
        "contract_length",
        "monthly_charges",
        "risk_level",
        "created_at",
    )
    search_fields = ("name", "email", "customer_code")
    list_filter = ("risk_level", "subscription_type", "contract_length")
    inlines = [SupportHistoryInline, RetentionActionInline]


@admin.register(SupportHistory)
class SupportHistoryAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "date", "issue", "status", "satisfaction")


@admin.register(RetentionAction)
class RetentionActionAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "action", "priority", "impact")