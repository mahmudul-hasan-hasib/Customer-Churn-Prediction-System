import apiClient from "./apiClient";

export interface CustomerPayload {
  name: string;
  email?: string;
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

export const getCustomers = async (params?: {
  search?: string;
  risk?: string;
  contract?: string;
}) => {
  const response = await apiClient.get("/customers/", { params });
  return response.data;
};

export const getCustomerById = async (id: number | string) => {
  const response = await apiClient.get(`/customers/${id}/`);
  return response.data;
};

export const createCustomer = async (payload: CustomerPayload) => {
  const response = await apiClient.post("/customers/", payload);
  return response.data;
};

export const updateCustomer = async (
  id: number | string,
  payload: Partial<CustomerPayload>
) => {
  const response = await apiClient.patch(`/customers/${id}/`, payload);
  return response.data;
};

export const deleteCustomer = async (id: number | string) => {
  const response = await apiClient.delete(`/customers/${id}/`);
  return response.data;
};

export const predictCustomer = async (id: number | string) => {
  const response = await apiClient.post(`/customers/${id}/predict/`);
  return response.data;
};