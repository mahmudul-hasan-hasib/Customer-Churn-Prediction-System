import os
import uuid
import joblib
import pandas as pd

from django.core.files import File
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from xgboost import XGBClassifier

from apps.ml_models.models import TrainedModel


REQUIRED_COLUMNS = [
    "Age",
    "Gender",
    "Tenure",
    "Usage Frequency",
    "Support Calls",
    "Payment Delay",
    "Subscription Type",
    "Contract Length",
    "Total Spend",
    "Last Interaction",
    "Churn",
]


def train_model_from_dataset(dataset, model_instance):
    df = pd.read_csv(dataset.file.path)

    missing_cols = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing_cols:
        raise ValueError(f"Missing columns: {missing_cols}")

    X = df.drop("Churn", axis=1)
    y = df["Churn"]

    X = pd.get_dummies(X)
    feature_columns = X.columns.tolist()

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42, stratify=y
    )

    model = XGBClassifier(
        random_state=42,
        eval_metric="logloss"
    )
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, zero_division=0)
    recall = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)

    pipeline = {
        "model": model,
        "scaler": scaler,
        "features": feature_columns,
    }

    tmp_filename = f"/tmp/{uuid.uuid4().hex}_churn_pipeline.pkl"
    joblib.dump(pipeline, tmp_filename)

    with open(tmp_filename, "rb") as f:
        model_instance.model_file.save(
            f"{model_instance.version}.pkl",
            File(f),
            save=False,
        )

    model_instance.accuracy = accuracy
    model_instance.precision = precision
    model_instance.recall = recall
    model_instance.f1_score = f1
    model_instance.status = "ready"
    model_instance.save()

    os.remove(tmp_filename)