import apiClient from "./apiClient";

export const getAdminOverview = async () => {
  const res = await apiClient.get("/analytics/admin-overview/");
  return res.data;
};

export const getModelMetrics = async () => {
  const res = await apiClient.get("/analytics/model-metrics/");
  return res.data;
};