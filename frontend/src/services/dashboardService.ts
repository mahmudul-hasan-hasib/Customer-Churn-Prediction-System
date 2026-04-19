import apiClient from "./apiClient";

export const getDashboardSummary = async () => {
  const response = await apiClient.get("/dashboard/summary/");
  return response.data;
};

export const getDashboardSegmentation = async () => {
  const response = await apiClient.get("/dashboard/segmentation/");
  return response.data;
};

export const getDashboardRecentActivity = async () => {
  const response = await apiClient.get("/dashboard/recent-activity/");
  return response.data;
};