import { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
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

const churnDistributionData = [
  { month: 'Jan', low: 6234, medium: 2145, high: 876 },
  { month: 'Feb', low: 6512, medium: 2298, high: 945 },
  { month: 'Mar', low: 6189, medium: 2087, high: 812 },
  { month: 'Apr', low: 6745, medium: 2456, high: 1023 },
  { month: 'May', low: 7012, medium: 2687, high: 1187 },
  { month: 'Jun', low: 7234, medium: 2875, high: 1434 },
];

const featureImportanceData = [
  { feature: 'Tenure', importance: 85 },
  { feature: 'Monthly Charges', importance: 72 },
  { feature: 'Contract Type', importance: 68 },
  { feature: 'Total Charges', importance: 54 },
  { feature: 'Payment Method', importance: 42 },
  { feature: 'Internet Service', importance: 38 },
  { feature: 'Phone Service', importance: 28 },
  { feature: 'Tech Support', importance: 24 },
];

const behaviorPatternsData = [
  { tenure: 2, charges: 145, churnRate: 85 },
  { tenure: 6, charges: 125, churnRate: 72 },
  { tenure: 12, charges: 110, churnRate: 54 },
  { tenure: 18, charges: 95, churnRate: 38 },
  { tenure: 24, charges: 89, churnRate: 25 },
  { tenure: 36, charges: 75, churnRate: 15 },
  { tenure: 48, charges: 68, churnRate: 8 },
];

const segmentDistributionData = [
  { name: 'Low Risk', value: 8234, color: '#10B981' },
  { name: 'Medium Risk', value: 2875, color: '#F59E0B' },
  { name: 'High Risk', value: 1434, color: '#EF4444' },
];

const retentionTrendData = [
  { month: 'Jan', retained: 82, churned: 18 },
  { month: 'Feb', retained: 81, churned: 19 },
  { month: 'Mar', retained: 83, churned: 17 },
  { month: 'Apr', retained: 80, churned: 20 },
  { month: 'May', retained: 79, churned: 21 },
  { month: 'Jun', retained: 81, churned: 19 },
];

export function Analytics() {
  const [filters, setFilters] = useState({
    dateRange: '6months',
    segment: 'all',
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Deep insights into customer behavior and churn patterns</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <Select
                options={[
                  { value: '1month', label: 'Last Month' },
                  { value: '3months', label: 'Last 3 Months' },
                  { value: '6months', label: 'Last 6 Months' },
                  { value: '1year', label: 'Last Year' },
                ]}
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              />
            </div>
            <div className="flex-1 flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <Select
                options={[
                  { value: 'all', label: 'All Segments' },
                  { value: 'low', label: 'Low Risk' },
                  { value: 'medium', label: 'Medium Risk' },
                  { value: 'high', label: 'High Risk' },
                ]}
                value={filters.segment}
                onChange={(e) => setFilters({ ...filters, segment: e.target.value })}
              />
            </div>
            <Button variant="primary">Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Churn Distribution Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Churn Risk Distribution Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={churnDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="low"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                name="Low Risk"
              />
              <Area
                type="monotone"
                dataKey="medium"
                stackId="1"
                stroke="#F59E0B"
                fill="#F59E0B"
                name="Medium Risk"
              />
              <Area
                type="monotone"
                dataKey="high"
                stackId="1"
                stroke="#EF4444"
                fill="#EF4444"
                name="High Risk"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Importance */}
        <Card>
          <CardHeader>
            <CardTitle>Model Feature Importance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={featureImportanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="feature" stroke="#6B7280" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="importance" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Segment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Current Segment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={segmentDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {segmentDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Behavior Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Behavior Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                type="number"
                dataKey="tenure"
                name="Tenure (months)"
                stroke="#6B7280"
                label={{ value: 'Tenure (months)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                type="number"
                dataKey="charges"
                name="Monthly Charges"
                stroke="#6B7280"
                label={{ value: 'Monthly Charges ($)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
                formatter={(value: any, name: string) => {
                  if (name === 'Tenure (months)') return [`${value} months`, name];
                  if (name === 'Monthly Charges') return [`$${value}`, name];
                  if (name === 'Churn Rate') return [`${value}%`, name];
                  return [value, name];
                }}
              />
              <Scatter
                name="Customers"
                data={behaviorPatternsData}
                fill="#3B82F6"
                fillOpacity={0.6}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Retention Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Retention vs Churn Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={retentionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="retained"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', r: 5 }}
                activeDot={{ r: 7 }}
                name="Retention Rate (%)"
              />
              <Line
                type="monotone"
                dataKey="churned"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: '#EF4444', r: 5 }}
                activeDot={{ r: 7 }}
                name="Churn Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
