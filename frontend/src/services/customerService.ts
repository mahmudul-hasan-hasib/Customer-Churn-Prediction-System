import apiClient from "./apiClient";

export interface CustomerListItem {
  id: number;
  customer_code: string;
  name: string;
  email?: string;
  tenure: number;
  monthly_charges: number;
  contract_length: "Annual" | "Monthly" | "Quarterly";
  churn_prediction: boolean;
  churn_probability: number;
  risk_level: "low" | "medium" | "high";
  updated_at: string;
}

export interface CustomerListParams {
  search?: string;
  risk?: string;
  contract?: string;
  page?: number;
  page_size?: number;
}

export interface PaginatedCustomerResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CustomerListItem[];
}

export const getCustomers = async (params?: CustomerListParams) => {
  const response = await apiClient.get<PaginatedCustomerResponse>("/customers/", {
    params,
  });
  return response.data;
};

export const getCustomerById = async (id: number | string) => {
  const response = await apiClient.get(`/customers/${id}/`);
  return response.data;
};

export const predictCustomer = async (id: number | string) => {
  const response = await apiClient.post(`/customers/${id}/predict/`);
  return response.data;
};

export const createCustomer = async (payload: any) => {
  const response = await apiClient.post("/customers/", payload);
  return response.data;
};

export const updateCustomer = async (id: number | string, payload: any) => {
  const response = await apiClient.patch(`/customers/${id}/`, payload);
  return response.data;
};

export const deleteCustomer = async (id: number | string) => {
  const response = await apiClient.delete(`/customers/${id}/`);
  return response.data;
};