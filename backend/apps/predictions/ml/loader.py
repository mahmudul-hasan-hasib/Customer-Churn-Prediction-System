import joblib
from apps.ml_models.models import TrainedModel


class ChurnPipeline:
    _pipeline = None
    _active_model_id = None

    @classmethod
    def load(cls):
        active_model = TrainedModel.objects.filter(is_active=True, status="ready").first()

        if not active_model:
            raise FileNotFoundError("No active trained model found.")

        if cls._pipeline is None or cls._active_model_id != active_model.id:
            cls._pipeline = joblib.load(active_model.model_file.path)
            cls._active_model_id = active_model.id

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