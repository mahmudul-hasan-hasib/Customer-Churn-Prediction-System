from rest_framework import serializers


class PredictionInputSerializer(serializers.Serializer):
    age = serializers.IntegerField(min_value=0)
    gender = serializers.ChoiceField(choices=["Female", "Male"])
    tenure = serializers.IntegerField(min_value=0)
    usage_frequency = serializers.IntegerField(min_value=0)
    support_calls = serializers.IntegerField(min_value=0)
    payment_delay = serializers.IntegerField(min_value=0)
    subscription_type = serializers.ChoiceField(choices=["Standard", "Basic", "Premium"])
    contract_length = serializers.ChoiceField(choices=["Annual", "Monthly", "Quarterly"])
    total_spend = serializers.FloatField(min_value=0)
    last_interaction = serializers.IntegerField(min_value=0)