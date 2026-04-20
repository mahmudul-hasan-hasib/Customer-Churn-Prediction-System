import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { getAdminOverview, getModelMetrics } from "../../services/adminService";


export function Admin() {
  const [overview, setOverview] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [overviewRes, metricsRes] = await Promise.all([
        getAdminOverview(),
        getModelMetrics(),
      ]);
      setOverview(overviewRes);
      setMetrics(metricsRes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Admin Panel</h1>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <>
          {/* MODEL INFO */}
          <Card>
            <CardHeader>
              <CardTitle>Model Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Version</p>
                <p className="font-semibold">{overview.model_version}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-semibold">{overview.last_updated}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Predictions</p>
                <p className="font-semibold">{overview.total_predictions}</p>
              </div>
            </CardContent>
          </Card>

          {/* METRICS */}
          <Card>
            <CardHeader>
              <CardTitle>Model Metrics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-4">
              <Metric label="Accuracy" value={metrics.accuracy} />
              <Metric label="Precision" value={metrics.precision} />
              <Metric label="Recall" value={metrics.recall} />
              <Metric label="F1 Score" value={metrics.f1_score} />
            </CardContent>
          </Card>

          {/* SYSTEM STATS */}
          <Card>
            <CardHeader>
              <CardTitle>System Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <Stat label="Customers" value={overview.total_customers} />
              <Stat label="Predictions" value={overview.total_predictions} />
              <Stat label="High Risk" value={overview.high_risk_customers} />
            </CardContent>
          </Card>

          {/* DATASET UPLOAD */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Dataset</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <Button disabled={!file}>
                Upload Dataset (Coming Soon)
              </Button>

              <p className="text-xs text-gray-500">
                CSV upload will be connected to retraining pipeline later.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function Metric({ label, value }: any) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold">{Math.round(value * 100)}%</p>
    </div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}