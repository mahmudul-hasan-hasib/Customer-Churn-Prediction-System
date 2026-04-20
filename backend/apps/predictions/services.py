import pandas as pd
from .ml.loader import ChurnPipeline

def get_risk_level(probability: float) -> str:
    if probability < 0.33:
        return "low"
    elif probability < 0.66:
        return "medium"
    return "high"


def build_input_dataframe(data: dict) -> pd.DataFrame:
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
    scaler = ChurnPipeline.get_scaler()
    training_columns = ChurnPipeline.get_features()

    df = build_input_dataframe(data)

    # EXACT SAME encoding
    df = pd.get_dummies(
        df,
        columns=["Gender", "Subscription Type", "Contract Length"],
        drop_first=True
    )

    # 🔥 CRITICAL: align columns
    for col in training_columns:
        if col not in df.columns:
            df[col] = 0

    df = df[training_columns]   # exact order

    # debug
    print("FINAL SUM:", df.sum(axis=1).values)

    scaled = scaler.transform(df)
    return pd.DataFrame(scaled, columns=training_columns)


def predict_churn(data: dict) -> dict:
    model = ChurnPipeline.get_model()
    processed_df = preprocess_input(data)

    prediction = int(model.predict(processed_df)[0])
    probability = float(model.predict_proba(processed_df)[0][1])

    return {
        "prediction": prediction,
        "probability": round(probability, 4),
        "risk_level": get_risk_level(probability),
    }