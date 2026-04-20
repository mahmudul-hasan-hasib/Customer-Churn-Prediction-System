from django.utils import timezone
from apps.customers.models import Customer


def get_admin_overview():
    total_customers = Customer.objects.count()
    total_predictions = Customer.objects.filter(churn_probability__gt=0).count()
    high_risk = Customer.objects.filter(risk_level="high").count()

    return {
        "model_version": "v2.1.0",
        "last_updated": timezone.now().strftime("%Y-%m-%d %H:%M"),
        "total_customers": total_customers,
        "total_predictions": total_predictions,
        "high_risk_customers": high_risk,
    }


def get_model_metrics():
    # static for now (later from training logs)
    return {
        "accuracy": 0.91,
        "precision": 0.88,
        "recall": 0.86,
        "f1_score": 0.87,
    }