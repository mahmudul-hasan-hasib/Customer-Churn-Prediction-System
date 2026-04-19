from pathlib import Path
import joblib


BASE_DIR = Path(__file__).resolve().parent
PIPELINE_PATH = BASE_DIR / "model_artifacts" / "churn_pipeline.pkl"


class ChurnPipeline:
    _pipeline = None

    @classmethod
    def load(cls):
        if cls._pipeline is None:
            cls._pipeline = joblib.load(PIPELINE_PATH)
        return cls._pipeline

    @classmethod
    def get_model(cls):
        return cls.load()["model"]

    @classmethod
    def get_scaler(cls):
        return cls.load()["scaler"]

    @classmethod
    def get_features(cls):
        return cls.load()["features"]