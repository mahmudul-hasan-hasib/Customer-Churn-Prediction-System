import { Link } from 'react-router';
import {
  Users,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Plus,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import {
  LineChart,
  Line,
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
  ResponsiveContainer,
} from 'recharts';

const kpis = [
  {
    title: 'Total Customers',
    value: '12,543',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'blue',
  },
  {
    title: 'Churn Rate',
    value: '18.2%',
    change: '-2.3%',
    trend: 'down',
    icon: TrendingDown,
    color: 'red',
  },
  {
    title: 'At-Risk Customers',
    value: '1,234',
    change: '+5.2%',
    trend: 'up',
    icon: AlertCircle,
    color: 'yellow',
  },
  {
    title: 'Retained Customers',
    value: '10,267',
    change: '+8.1%',
    trend: 'up',
    icon: CheckCircle,
    color: 'green',
  },
];

const churnTrendData = [
  { month: 'Jan', churnRate: 15.2 },
  { month: 'Feb', churnRate: 16.8 },
  { month: 'Mar', churnRate: 14.5 },
  { month: 'Apr', churnRate: 17.3 },
  { month: 'May', churnRate: 19.1 },
  { month: 'Jun', churnRate: 18.2 },
];

const segmentationData = [
  { name: 'Low Risk', value: 8234, color: '#10B981' },
  { name: 'Medium Risk', value: 2875, color: '#F59E0B' },
  { name: 'High Risk', value: 1434, color: '#EF4444' },
];

const retentionData = [
  { contractType: 'Month-to-Month', retained: 65, churned: 35 },
  { contractType: 'One Year', retained: 85, churned: 15 },
  { contractType: 'Two Year', retained: 92, churned: 8 },
];

const recentActivity = [
  { id: 1, customer: 'Sarah Johnson', risk: 'high', action: 'Prediction updated', time: '5 min ago' },
  { id: 2, customer: 'Michael Chen', risk: 'medium', action: 'New customer added', time: '12 min ago' },
  { id: 3, customer: 'Emma Davis', risk: 'low', action: 'Contract renewed', time: '28 min ago' },
  { id: 4, customer: 'James Wilson', risk: 'high', action: 'Support ticket opened', time: '1 hour ago' },
  { id: 5, customer: 'Olivia Brown', risk: 'medium', action: 'Payment updated', time: '2 hours ago' },
];

export function Dashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1 text-sm">Welcome back! Here's what's happening today.</p>
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} hover>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    kpi.color === 'blue' ? 'bg-blue-50' :
                    kpi.color === 'red' ? 'bg-rose-50' :
                    kpi.color === 'yellow' ? 'bg-amber-50' :
                    'bg-emerald-50'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      kpi.color === 'blue' ? 'text-blue-600' :
                      kpi.color === 'red' ? 'text-rose-600' :
                      kpi.color === 'yellow' ? 'text-amber-600' :
                      'text-emerald-600'
                    }`} />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50">
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className={`w-3.5 h-3.5 ${kpi.color === 'green' || kpi.color === 'blue' ? 'text-emerald-600' : 'text-rose-600'}`} />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    <span className={`text-xs font-medium ${kpi.trend === 'down' || (kpi.color === 'green' || kpi.color === 'blue') ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">{kpi.title}</p>
                  <p className="text-2xl font-semibold text-slate-900">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Churn Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Churn Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={churnTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="churnRate"
                  stroke="#0F172A"
                  strokeWidth={2}
                  dot={{ fill: '#0F172A', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Segmentation */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segmentation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {segmentationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '13px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Retention Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Retention Performance by Contract Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="contractType" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '13px' }} />
              <Bar dataKey="retained" fill="#10B981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="churned" fill="#EF4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Link to="/customers" className="text-sm text-slate-900 hover:text-slate-700 font-medium transition-colors">
              View all
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
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
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.customer}</TableCell>
                  <TableCell>
                    <Badge variant={activity.risk as 'low' | 'medium' | 'high'}>
                      {activity.risk.charAt(0).toUpperCase() + activity.risk.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{activity.action}</TableCell>
                  <TableCell className="text-slate-500 text-xs">{activity.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
