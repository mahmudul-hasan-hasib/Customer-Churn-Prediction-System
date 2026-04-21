import apiClient from "./apiClient";

export interface PredictionPayload {
  age: number;
  gender: "Female" | "Male";
  tenure: number;
  usage_frequency: number;
  support_calls: number;
  payment_delay: number;
  subscription_type: "Standard" | "Basic" | "Premium";
  contract_length: "Annual" | "Monthly" | "Quarterly";
  total_spend: number;
  last_interaction: number;
}

export interface PredictionResponse {
  prediction: number;
  probability: number;
  risk_level: "low" | "medium" | "high";
}

export const predictChurn = async (
  payload: PredictionPayload
): Promise<PredictionResponse> => {
  console.log("Prediction payload:", payload);

  const response = await apiClient.post("/predictions/predict/", payload);

  console.log("Prediction API response:", response.data);
  return response.data;
};