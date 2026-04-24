import pandas as pd

from .ml.loader import ChurnPipeline


def get_risk_level(probability: float) -> str:
    """
    Convert churn probability into frontend-friendly risk level.
    """
    if probability < 0.33:
        return "low"
    elif probability < 0.66:
        return "medium"
    return "high"


def build_input_dataframe(data: dict) -> pd.DataFrame:
    """
    Convert API snake_case input into the original training column names.
    These names must match the raw dataset columns used before pd.get_dummies().
    """
    row = {
        "Age": data["age"],
        "Gender": data["gender"],
        "Tenure": data["tenure"],
        "Usage Frequency": data["usage_frequency"],
        "Support Calls": data["support_calls"],
        "Payment Delay": data["payment_delay"],
        "Subscription Type": data["subscription_type"],
        "Contract Length": data["contract_length"],
        "Total Spend": data["total_spend"],
        "Last Interaction": data["last_interaction"],
    }

    return pd.DataFrame([row])


def preprocess_input(data: dict) -> pd.DataFrame:
    """
    Match the exact preprocessing used during training:

    raw input
    -> pd.get_dummies()
    -> reindex to saved training feature columns
    -> scaler.transform()
    """
    scaler = ChurnPipeline.get_scaler()
    training_columns = ChurnPipeline.get_features()

    df = build_input_dataframe(data)

    # Same categorical encoding style as training notebook
    df = pd.get_dummies(df)

    # Ensure exact same columns and order as training
    df = df.reindex(columns=training_columns, fill_value=0)

    # Scale all columns, same as training
    scaled = scaler.transform(df)

    return pd.DataFrame(scaled, columns=training_columns)


def predict_churn(data: dict) -> dict:
    """
    Run churn prediction using loaded model pipeline.

    Uses custom threshold from pipeline if available.
    Falls back to 0.4 because this project selected threshold=0.4.
    """
    model = ChurnPipeline.get_model()
    threshold = ChurnPipeline.get_threshold()

    processed_df = preprocess_input(data)

    probability = float(model.predict_proba(processed_df)[0][1])
    prediction = int(probability >= threshold)

    return {
        "prediction": prediction,
        "probability": round(probability, 4),
        "risk_level": get_risk_level(probability),
    }