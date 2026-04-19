import apiClient from './apiClient';

export type PredictPayload = {
  age: number;
  gender: 'Male' | 'Female';
  tenure: number;
  usage_frequency: number;
  support_calls: number;
  payment_delay: number;
  subscription_type: 'Standard' | 'Basic' | 'Premium';
  contract_length: 'Annual' | 'Monthly' | 'Quarterly';
  total_spend: number;
  last_interaction: number;
};

export type PredictResponse = {
  prediction: number;
  probability: number;
  risk_level: 'low' | 'medium' | 'high';
};

export const predictChurn = async (
  payload: PredictPayload
): Promise<PredictResponse> => {
  try {
    const response = await apiClient.post('/predictions/predict/', payload);
    return response.data;
  } catch (error: any) {
    console.error('Prediction error:', error);
    throw error;
  }
};