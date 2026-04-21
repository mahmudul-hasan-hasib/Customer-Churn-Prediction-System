import { useEffect, useState } from "react";
import { Upload, Cpu, CheckCircle, RefreshCw } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

import { getAdminOverview, getModelMetrics } from "../../services/adminService";
import { getDatasets, uploadDataset, type DatasetItem } from "../../services/datasetService";
import { getModels, retrainModel, activateModel, type TrainedModelItem } from "../../services/mlModelService";

export function Admin() {
  const [overview, setOverview] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);

  const [datasets, setDatasets] = useState<DatasetItem[]>([]);
  const [models, setModels] = useState<TrainedModelItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [retrainingDatasetId, setRetrainingDatasetId] = useState<number | null>(null);
  const [activatingModelId, setActivatingModelId] = useState<number | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [overviewRes, metricsRes, datasetsRes, modelsRes] = await Promise.all([
        getAdminOverview(),
        getModelMetrics(),
        getDatasets(),
        getModels(),
      ]);

      setOverview(overviewRes);
      setMetrics(metricsRes);
      setDatasets(datasetsRes);
      setModels(modelsRes);
    } catch (err: any) {
      setError("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUploadDataset = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      await uploadDataset(selectedFile);
      setSuccess("Dataset uploaded successfully.");
      setSelectedFile(null);
      await loadData();
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Dataset upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleRetrain = async (datasetId: number) => {
    try {
      setRetrainingDatasetId(datasetId);
      setError("");
      setSuccess("");

      await retrainModel(datasetId);
      setSuccess("Model training completed successfully.");
      await loadData();
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.error ||
          "Model retraining failed."
      );
    } finally {
      setRetrainingDatasetId(null);
    }
  };

  const handleActivate = async (modelId: number) => {
    try {
      setActivatingModelId(modelId);
      setError("");
      setSuccess("");

      const res = await activateModel(modelId);
      setSuccess(res.detail || "Model activated successfully.");
      await loadData();
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Failed to activate model."
      );
    } finally {
      setActivatingModelId(null);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Admin Panel</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage datasets, retrain churn models, and activate production models.
          </p>
        </div>

        <Button variant="secondary" onClick={loadData} disabled={loading}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Loading admin dashboard...
        </div>
      ) : (
        <>
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <StatCard
              title="Model Version"
              value={overview?.model_version || "N/A"}
            />
            <StatCard
              title="Total Predictions"
              value={overview?.total_predictions ?? 0}
            />
            <StatCard
              title="High Risk Customers"
              value={overview?.high_risk_customers ?? 0}
            />
          </div>

          {/* Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Current Model Metrics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard label="Accuracy" value={metrics?.accuracy ?? 0} />
              <MetricCard label="Precision" value={metrics?.precision ?? 0} />
              <MetricCard label="Recall" value={metrics?.recall ?? 0} />
              <MetricCard label="F1 Score" value={metrics?.f1_score ?? 0} />
            </CardContent>
          </Card>

          {/* Dataset Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Training Dataset</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select CSV file
                </label>

                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700"
                />

                {selectedFile && (
                  <p className="mt-3 text-sm text-slate-600">
                    Selected: <span className="font-medium">{selectedFile.name}</span>
                  </p>
                )}
              </div>

              <Button onClick={handleUploadDataset} disabled={!selectedFile || uploading}>
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Upload Dataset"}
              </Button>

              <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-xs text-blue-800">
                Required CSV columns: Age, Gender, Tenure, Usage Frequency, Support Calls,
                Payment Delay, Subscription Type, Contract Length, Total Spend, Last Interaction, Churn
              </div>
            </CardContent>
          </Card>

          {/* Datasets */}
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Datasets</CardTitle>
            </CardHeader>
            <CardContent>
              {datasets.length === 0 ? (
                <p className="text-sm text-slate-600">No datasets uploaded yet.</p>
              ) : (
                <div className="space-y-4">
                  {datasets.map((dataset) => (
                    <div
                      key={dataset.id}
                      className="rounded-xl border border-slate-200 p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <p className="font-medium text-slate-900">{dataset.name}</p>
                          <Badge variant={mapDatasetStatusVariant(dataset.status)}>
                            {dataset.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">
                          Rows: {dataset.row_count} | Columns: {dataset.column_count}
                        </p>
                        <p className="text-xs text-slate-500">
                          Uploaded: {formatDate(dataset.uploaded_at)}
                        </p>
                        {dataset.error_message && (
                          <p className="text-xs text-red-600">{dataset.error_message}</p>
                        )}
                      </div>

                      <div>
                        <Button
                          onClick={() => handleRetrain(dataset.id)}
                          disabled={
                            retrainingDatasetId === dataset.id ||
                            dataset.status === "failed"
                          }
                        >
                          <Cpu className="w-4 h-4 mr-2" />
                          {retrainingDatasetId === dataset.id ? "Training..." : "Train Model"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trained Models */}
          <Card>
            <CardHeader>
              <CardTitle>Trained Models</CardTitle>
            </CardHeader>
            <CardContent>
              {models.length === 0 ? (
                <p className="text-sm text-slate-600">No trained models available yet.</p>
              ) : (
                <div className="space-y-4">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      className="rounded-xl border border-slate-200 p-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <p className="font-medium text-slate-900">{model.version}</p>
                          <Badge variant={mapModelStatusVariant(model.status)}>
                            {model.status}
                          </Badge>
                          {model.is_active && (
                            <Badge variant="success">Active</Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-slate-600">
                          <div>Accuracy: <span className="font-medium">{toPercent(model.accuracy)}</span></div>
                          <div>Precision: <span className="font-medium">{toPercent(model.precision)}</span></div>
                          <div>Recall: <span className="font-medium">{toPercent(model.recall)}</span></div>
                          <div>F1: <span className="font-medium">{toPercent(model.f1_score)}</span></div>
                        </div>

                        <p className="text-xs text-slate-500">
                          Trained: {formatDate(model.trained_at)}
                        </p>

                        {model.error_message && (
                          <p className="text-xs text-red-600">{model.error_message}</p>
                        )}
                      </div>

                      <div>
                        <Button
                          variant={model.is_active ? "secondary" : "primary"}
                          onClick={() => handleActivate(model.id)}
                          disabled={
                            model.is_active ||
                            model.status !== "ready" ||
                            activatingModelId === model.id
                          }
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {activatingModelId === model.id
                            ? "Activating..."
                            : model.is_active
                            ? "Active Model"
                            : "Activate"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-slate-600 mb-1">{title}</p>
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
      </CardContent>
    </Card>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
      <p className="text-sm text-slate-600 mb-1">{label}</p>
      <p className="text-xl font-semibold text-slate-900">{toPercent(value)}</p>
    </div>
  );
}

function toPercent(value: number) {
  return `${Math.round((value || 0) * 100)}%`;
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function mapDatasetStatusVariant(status: string): "success" | "warning" | "danger" | "info" {
  if (status === "completed") return "success";
  if (status === "processing") return "warning";
  if (status === "failed") return "danger";
  return "info";
}

function mapModelStatusVariant(status: string): "success" | "warning" | "danger" | "info" {
  if (status === "ready") return "success";
  if (status === "training") return "warning";
  if (status === "failed") return "danger";
  return "info";
}