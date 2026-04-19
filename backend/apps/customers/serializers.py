from rest_framework import serializers
from .models import Customer, SupportHistory, RetentionAction


class SupportHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportHistory
        fields = ["id", "date", "issue", "status", "satisfaction"]


class RetentionActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RetentionAction
        fields = ["id", "action", "priority", "impact"]


class CustomerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "id",
            "customer_code",
            "name",
            "email",
            "tenure",
            "monthly_charges",
            "contract_length",
            "churn_prediction",
            "churn_probability",
            "risk_level",
            "updated_at",
        ]


class CustomerCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "customer_code",
            "name",
            "email",
            "phone",
            "location",
            "joined_date",
            "age",
            "gender",
            "tenure",
            "usage_frequency",
            "support_calls",
            "payment_delay",
            "subscription_type",
            "contract_length",
            "payment_method",
            "paperless_billing",
            "monthly_charges",
            "total_spend",
            "internet_service",
            "additional_services",
            "last_interaction",
        ]


class CustomerDetailSerializer(serializers.ModelSerializer):
    support_history = SupportHistorySerializer(many=True, read_only=True)
    retention_actions = RetentionActionSerializer(many=True, read_only=True)
    feature_importance = serializers.SerializerMethodField()

    class Meta:
        model = Customer
        fields = [
            "id",
            "customer_code",
            "name",
            "email",
            "phone",
            "location",
            "joined_date",
            "age",
            "gender",
            "tenure",
            "usage_frequency",
            "support_calls",
            "payment_delay",
            "subscription_type",
            "contract_length",
            "payment_method",
            "paperless_billing",
            "monthly_charges",
            "total_spend",
            "internet_service",
            "additional_services",
            "last_interaction",
            "churn_prediction",
            "churn_probability",
            "risk_level",
            "prediction_confidence",
            "model_version",
            "created_at",
            "updated_at",
            "support_history",
            "retention_actions",
            "feature_importance",
        ]

    def get_feature_importance(self, obj):
        return [
            {"feature": "Tenure", "importance": 85},
            {"feature": "Monthly Charges", "importance": 72},
            {"feature": "Contract Type", "importance": 68},
            {"feature": "Total Charges", "importance": 54},
            {"feature": "Payment Method", "importance": 42},
            {"feature": "Internet Service", "importance": 38},
        ]