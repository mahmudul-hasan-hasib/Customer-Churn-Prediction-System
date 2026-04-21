import apiClient from "./apiClient";

export interface TrainedModelItem {
  id: number;
  version: string;
  dataset: number;
  model_file: string;
  status: "training" | "ready" | "failed";
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  is_active: boolean;
  trained_at: string;
  error_message?: string | null;
}

export const getModels = async () => {
  const response = await apiClient.get<TrainedModelItem[]>("/ml-models/");
  return response.data;
};

export const retrainModel = async (datasetId: number) => {
  const response = await apiClient.post(`/ml-models/retrain/${datasetId}/`);
  return response.data;
};

export const activateModel = async (modelId: number) => {
  const response = await apiClient.post(`/ml-models/${modelId}/activate/`);
  return response.data;
};