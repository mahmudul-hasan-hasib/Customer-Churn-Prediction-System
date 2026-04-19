from rest_framework import serializers


class DashboardSummarySerializer(serializers.Serializer):
    total_customers = serializers.IntegerField()
    churn_rate = serializers.FloatField()
    at_risk = serializers.IntegerField()
    retained = serializers.IntegerField()