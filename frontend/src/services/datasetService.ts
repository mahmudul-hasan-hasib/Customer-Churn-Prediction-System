import apiClient from "./apiClient";

export interface DatasetItem {
  id: number;
  name: string;
  file: string;
  uploaded_at: string;
  status: "uploaded" | "processing" | "completed" | "failed";
  row_count: number;
  column_count: number;
  error_message?: string | null;
}

export const getDatasets = async () => {
  const response = await apiClient.get<DatasetItem[]>("/datasets/");
  return response.data;
};

export const uploadDataset = async (file: File, name?: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name || file.name);

  const response = await apiClient.post("/datasets/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};