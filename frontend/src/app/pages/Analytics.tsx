import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import {
  getFeatureImportance,
  getChurnDistribution,
  getContractChurnAnalysis,
  getRiskOverview,
} from "../../services/analyticsService";

const PIE_COLORS = ["#EF4444", "#10B981"];
const RISK_COLORS = ["#10B981", "#F59E0B", "#EF4444"];

export function Analytics() {
  const [featureImportance, setFeatureImportance] = useState<any[]>([]);
  const [churnDistribution, setChurnDistribution] = useState<any[]>([]);
  const [contractChurn, setContractChurn] = useState<any[]>([]);
  const [riskOverview, setRiskOverview] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const [featureRes, churnRes, contractRes, riskRes] = await Promise.all([
        getFeatureImportance(),
        getChurnDistribution(),
        getContractChurnAnalysis(),
        getRiskOverview(),
      ]);

      setFeatureImportance(featureRes);
      setChurnDistribution(churnRes);
      setContractChurn(contractRes);
      setRiskOverview(riskRes);
    } catch (err) {
      setError("Failed to load analytics data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Analytics</h1>
        <p className="mt-1 text-sm text-slate-600">
          Detailed churn insights and model-driven customer behavior analysis.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Loading analytics...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={featureImportance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                    <XAxis type="number" stroke="#94A3B8" />
                    <YAxis
                      dataKey="feature"
                      type="category"
                      stroke="#94A3B8"
                      width={120}
                    />
                    <Tooltip />
                    <Bar dataKey="importance" fill="#0F172A" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={churnDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      dataKey="value"
                      label
                    >
                      {churnDistribution.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract-wise Churn Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={contractChurn}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="contract" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="retained" fill="#10B981" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="churned" fill="#EF4444" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={riskOverview}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="risk" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {riskOverview.map((_, index) => (
                        <Cell
                          key={`risk-cell-${index}`}
                          fill={RISK_COLORS[index % RISK_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}