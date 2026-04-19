import apiClient from "./apiClient";

export interface DashboardSummary {
  total_customers: number;
  churn_rate: number;
  at_risk: number;
  retained: number;
}

export interface SegmentationItem {
  name: string;
  value: number;
}

export interface ChurnTrendItem {
  month: string;
  churnRate: number;
}

export interface RetentionPerformanceItem {
  contractType: string;
  retained: number;
  churned: number;
}

export interface RecentActivityItem {
  id: number;
  customer: string;
  risk: "low" | "medium" | "high";
  action: string;
  time: string;
}

export const getDashboardSummary = async () => {
  const response = await apiClient.get<DashboardSummary>("/dashboard/summary/");
  return response.data;
};

export const getDashboardSegmentation = async () => {
  const response = await apiClient.get<SegmentationItem[]>("/dashboard/segmentation/");
  return response.data;
};

export const getDashboardRecentActivity = async () => {
  const response = await apiClient.get<RecentActivityItem[]>("/dashboard/recent-activity/");
  return response.data;
};

export const getDashboardChurnTrend = async () => {
  const response = await apiClient.get<ChurnTrendItem[]>("/dashboard/churn-trend/");
  return response.data;
};

export const getDashboardRetentionPerformance = async () => {
  const response = await apiClient.get<RetentionPerformanceItem[]>(
    "/dashboard/retention-performance/"
  );
  return response.data;
};