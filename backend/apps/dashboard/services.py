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
            "customer": customer.name,
            "risk": customer.risk_level,
            "action": "Prediction updated" if customer.churn_probability > 0 else "Customer record updated",
            "time": customer.updated_at.strftime("%Y-%m-%d %H:%M"),
        }
        for customer in customers
    ]


def get_churn_trend_data():
    # placeholder static for now
    # later we can make it DB-driven from snapshots/history table
    return [
        {"month": "Jan", "churnRate": 15.2},
        {"month": "Feb", "churnRate": 16.8},
        {"month": "Mar", "churnRate": 14.5},
        {"month": "Apr", "churnRate": 17.3},
        {"month": "May", "churnRate": 19.1},
        {"month": "Jun", "churnRate": 18.2},
    ]


def get_retention_performance():
    return [
        {
            "contractType": "Monthly",
            "retained": Customer.objects.filter(contract_length="Monthly", churn_prediction=False).count(),
            "churned": Customer.objects.filter(contract_length="Monthly", churn_prediction=True).count(),
        },
        {
            "contractType": "Quarterly",
            "retained": Customer.objects.filter(contract_length="Quarterly", churn_prediction=False).count(),
            "churned": Customer.objects.filter(contract_length="Quarterly", churn_prediction=True).count(),
        },
        {
            "contractType": "Annual",
            "retained": Customer.objects.filter(contract_length="Annual", churn_prediction=False).count(),
            "churned": Customer.objects.filter(contract_length="Annual", churn_prediction=True).count(),
        },
    ]