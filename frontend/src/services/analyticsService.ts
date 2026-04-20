import apiClient from "./apiClient";

export interface FeatureImportanceItem {
  feature: string;
  importance: number;
}

export interface ChurnDistributionItem {
  name: string;
  value: number;
}

export interface ContractChurnItem {
  contract: string;
  churned: number;
  retained: number;
}

export interface RiskOverviewItem {
  risk: string;
  count: number;
}

export const getFeatureImportance = async () => {
  const response = await apiClient.get<FeatureImportanceItem[]>(
    "/analytics/feature-importance/"
  );
  return response.data;
};

export const getChurnDistribution = async () => {
  const response = await apiClient.get<ChurnDistributionItem[]>(
    "/analytics/churn-distribution/"
  );
  return response.data;
};

export const getContractChurnAnalysis = async () => {
  const response = await apiClient.get<ContractChurnItem[]>(
    "/analytics/contract-churn/"
  );
  return response.data;
};

export const getRiskOverview = async () => {
  const response = await apiClient.get<RiskOverviewItem[]>(
    "/analytics/risk-overview/"
  );
  return response.data;
};