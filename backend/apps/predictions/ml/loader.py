import os
import joblib

from django.conf import settings
from django.db.utils import OperationalError, ProgrammingError
from apps.ml_models.models import TrainedModel


class ChurnPipeline:
    _pipeline = None
    _active_model_id = None
    _fallback_loaded = False

    @classmethod
    def load(cls):
        active_model = None

        try:
            active_model = TrainedModel.objects.filter(
                is_active=True,
                status="ready"
            ).first()
        except (OperationalError, ProgrammingError):
            active_model = None

        if active_model:
            if cls._pipeline is None or cls._active_model_id != active_model.id:
                cls._pipeline = joblib.load(active_model.model_file.path)
                cls._active_model_id = active_model.id
                cls._fallback_loaded = False

            return cls._pipeline

        fallback_path = os.path.join(
            settings.BASE_DIR,
            "apps",
            "predictions",
            "ml",
            "model_artifacts",
            "churn_pipeline.pkl",
        )

        if not os.path.exists(fallback_path):
            raise FileNotFoundError(
                "No active model found and fallback pipeline is missing."
            )

        if cls._pipeline is None or not cls._fallback_loaded:
            cls._pipeline = joblib.load(fallback_path)
            cls._active_model_id = None
            cls._fallback_loaded = True

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

    @classmethod
    def get_threshold(cls):
        return cls.load().get("threshold", 0.4)

    @classmethod
    def get_numeric_columns(cls):
        return cls.load().get("numeric_columns", [])

    @classmethod
    def get_categorical_columns(cls):
        return cls.load().get("categorical_columns", [])