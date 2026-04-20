from apps.customers.models import Customer


def get_feature_importance():
    return [
        {"feature": "Tenure", "importance": 85},
        {"feature": "Total Spend", "importance": 72},
        {"feature": "Subscription Type", "importance": 68},
        {"feature": "Contract Length", "importance": 61},
        {"feature": "Usage Frequency", "importance": 56},
        {"feature": "Payment Delay", "importance": 49},
        {"feature": "Support Calls", "importance": 43},
        {"feature": "Last Interaction", "importance": 37},
        {"feature": "Age", "importance": 29},
        {"feature": "Gender", "importance": 18},
    ]


def get_churn_distribution():
    churned = Customer.objects.filter(churn_prediction=True).count()
    retained = Customer.objects.filter(churn_prediction=False).count()

    return [
        {"name": "Churned", "value": churned},
        {"name": "Retained", "value": retained},
    ]


def get_contract_churn_analysis():
    return [
        {
            "contract": "Monthly",
            "churned": Customer.objects.filter(
                contract_length="Monthly",
                churn_prediction=True
            ).count(),
            "retained": Customer.objects.filter(
                contract_length="Monthly",
                churn_prediction=False
            ).count(),
        },
        {
            "contract": "Quarterly",
            "churned": Customer.objects.filter(
                contract_length="Quarterly",
                churn_prediction=True
            ).count(),
            "retained": Customer.objects.filter(
                contract_length="Quarterly",
                churn_prediction=False
            ).count(),
        },
        {
            "contract": "Annual",
            "churned": Customer.objects.filter(
                contract_length="Annual",
                churn_prediction=True
            ).count(),
            "retained": Customer.objects.filter(
                contract_length="Annual",
                churn_prediction=False
            ).count(),
        },
    ]


def get_risk_overview():
    return [
        {
            "risk": "Low",
            "count": Customer.objects.filter(risk_level="low").count(),
        },
        {
            "risk": "Medium",
            "count": Customer.objects.filter(risk_level="medium").count(),
        },
        {
            "risk": "High",
            "count": Customer.objects.filter(risk_level="high").count(),
        },
    ]


def get_admin_overview():
    total_customers = Customer.objects.count()
    churned = Customer.objects.filter(churn_prediction=True).count()
    retained = Customer.objects.filter(churn_prediction=False).count()
    churn_rate = (churned / total_customers * 100) if total_customers > 0 else 0

    return {
        "total_customers": total_customers,
        "churned": churned,
        "retained": retained,
        "churn_rate": round(churn_rate, 2),
    }


def get_model_metrics():
    # Placeholder for model metrics, in real app would come from ML model
    return {
        "accuracy": 0.92,
        "precision": 0.89,
        "recall": 0.85,
        "f1_score": 0.87,
    }