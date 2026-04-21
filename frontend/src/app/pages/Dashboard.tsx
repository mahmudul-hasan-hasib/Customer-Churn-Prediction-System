import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle,
  Plus,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getDashboardChurnTrend,
  getDashboardRecentActivity,
  getDashboardRetentionPerformance,
  getDashboardSegmentation,
  getDashboardSummary,
  type DashboardSummary,
  type SegmentationItem,
  type ChurnTrendItem,
  type RetentionPerformanceItem,
  type RecentActivityItem,
} from "../../services/dashboardService";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";

const PIE_COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const DEFAULT_SUMMARY: DashboardSummary = {
  total_customers: 0,
  churn_rate: 0,
  at_risk: 0,
  retained: 0,
};

export function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary>(DEFAULT_SUMMARY);
  const [segmentationData, setSegmentationData] = useState<SegmentationItem[]>([]);
  const [churnTrendData, setChurnTrendData] = useState<ChurnTrendItem[]>([]);
  const [retentionData, setRetentionData] = useState<RetentionPerformanceItem[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [summaryRes, segmentationRes, recentRes, trendRes, retentionRes] =
        await Promise.all([
          getDashboardSummary(),
          getDashboardSegmentation(),
          getDashboardRecentActivity(),
          getDashboardChurnTrend(),
          getDashboardRetentionPerformance(),
        ]);

      console.log("summaryRes:", summaryRes);
      console.log("segmentationRes:", segmentationRes, "isArray:", Array.isArray(segmentationRes));
      console.log("recentRes:", recentRes, "isArray:", Array.isArray(recentRes));
      console.log("trendRes:", trendRes, "isArray:", Array.isArray(trendRes));
      console.log("retentionRes:", retentionRes, "isArray:", Array.isArray(retentionRes));

      setSummary(summaryRes ?? DEFAULT_SUMMARY);
      setSegmentationData(Array.isArray(segmentationRes) ? segmentationRes : []);
      setRecentActivity(Array.isArray(recentRes) ? recentRes : []);
      setChurnTrendData(Array.isArray(trendRes) ? trendRes : []);
      setRetentionData(Array.isArray(retentionRes) ? retentionRes : []);
    } catch (err) {
      console.error("Dashboard load error:", err);
      setError("Failed to load dashboard data.");
      setSummary(DEFAULT_SUMMARY);
      setSegmentationData([]);
      setRecentActivity([]);
      setChurnTrendData([]);
      setRetentionData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const safeSegmentationData = Array.isArray(segmentationData) ? segmentationData : [];
  const safeChurnTrendData = Array.isArray(churnTrendData) ? churnTrendData : [];
  const safeRetentionData = Array.isArray(retentionData) ? retentionData : [];
  const safeRecentActivity = Array.isArray(recentActivity) ? recentActivity : [];

  const kpis = useMemo(
    () => [
      {
        title: "Total Customers",
        value: (summary.total_customers ?? 0).toLocaleString(),
        change: "+12.5%",
        trend: "up",
        icon: Users,
        color: "blue",
      },
      {
        title: "Churn Rate",
        value: `${summary.churn_rate ?? 0}%`,
        change: "-2.3%",
        trend: "down",
        icon: TrendingDown,
        color: "red",
      },
      {
        title: "At-Risk Customers",
        value: (summary.at_risk ?? 0).toLocaleString(),
        change: "+5.2%",
        trend: "up",
        icon: AlertCircle,
        color: "yellow",
      },
      {
        title: "Retained Customers",
        value: (summary.retained ?? 0).toLocaleString(),
        change: "+8.1%",
        trend: "up",
        icon: CheckCircle,
        color: "green",
      },
    ],
    [summary]
  );

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1 text-sm">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>

        <div className="flex gap-2">
          <Link to="/prediction">
            <Button variant="secondary" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Predict Churn
            </Button>
          </Link>
          <Link to="/customers">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <Card key={kpi.title} hover>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      kpi.color === "blue"
                        ? "bg-blue-50"
                        : kpi.color === "red"
                        ? "bg-rose-50"
                        : kpi.color === "yellow"
                        ? "bg-amber-50"
                        : "bg-emerald-50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        kpi.color === "blue"
                          ? "text-blue-600"
                          : kpi.color === "red"
                          ? "text-rose-600"
                          : kpi.color === "yellow"
                          ? "text-amber-600"
                          : "text-emerald-600"
                      }`}
                    />
                  </div>

                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50">
                    {kpi.trend === "up" ? (
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 ${
                          kpi.color === "green" || kpi.color === "blue"
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        kpi.trend === "down" ||
                        kpi.color === "green" ||
                        kpi.color === "blue"
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {kpi.change}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">{kpi.title}</p>
                  <p className="text-2xl font-semibold text-slate-900">
                    {loading ? "..." : kpi.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Churn Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={safeChurnTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="churnRate"
                  stroke="#0F172A"
                  strokeWidth={2}
                  dot={{ fill: "#0F172A", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Segmentation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={safeSegmentationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                >
                  {safeSegmentationData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "13px" }} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Retention Performance by Contract Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={safeRetentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="contractType"
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "13px" }} />
              <Bar dataKey="retained" fill="#10B981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="churned" fill="#EF4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Link
              to="/customers"
              className="text-sm text-slate-900 hover:text-slate-700 font-medium transition-colors"
            >
              View all
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-sm text-slate-600">Loading dashboard...</div>
          ) : safeRecentActivity.length === 0 ? (
            <div className="p-6 text-sm text-slate-600">No recent activity found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {safeRecentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.customer}</TableCell>
                    <TableCell>
                      <Badge variant={activity.risk}>
                        {activity.risk.charAt(0).toUpperCase() + activity.risk.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{activity.action}</TableCell>
                    <TableCell className="text-slate-500 text-xs">{activity.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}