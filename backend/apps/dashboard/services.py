from apps.customers.models import Customer


def get_dashboard_summary():
    total_customers = Customer.objects.count()
    at_risk = Customer.objects.filter(risk_level="high").count()
    retained = Customer.objects.filter(churn_prediction=False).count()
    churned = Customer.objects.filter(churn_prediction=True).count()

    churn_rate = 0.0
    if total_customers > 0:
        churn_rate = round((churned / total_customers) * 100, 2)

    return {
        "total_customers": total_customers,
        "churn_rate": churn_rate,
        "at_risk": at_risk,
        "retained": retained,
    }


def get_segmentation_data():
    return [
        {"name": "Low Risk", "value": Customer.objects.filter(risk_level="low").count()},
        {"name": "Medium Risk", "value": Customer.objects.filter(risk_level="medium").count()},
        {"name": "High Risk", "value": Customer.objects.filter(risk_level="high").count()},
    ]


def get_recent_activity():
    customers = Customer.objects.order_by("-updated_at")[:5]

    return [
        {
            "id": customer.id,
            "customer_name": customer.name,
            "risk_level": customer.risk_level,
            "probability": customer.churn_probability,
            "updated_at": customer.updated_at,
        }
        for customer in customers
    ]