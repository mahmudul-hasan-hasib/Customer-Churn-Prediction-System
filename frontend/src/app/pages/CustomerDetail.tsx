import { Link } from 'react-router';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const featureImportanceData = [
  { feature: 'Tenure', importance: 85 },
  { feature: 'Monthly Charges', importance: 72 },
  { feature: 'Contract Type', importance: 68 },
  { feature: 'Total Charges', importance: 54 },
  { feature: 'Payment Method', importance: 42 },
  { feature: 'Internet Service', importance: 38 },
];

const retentionActions = [
  { id: 1, action: 'Offer loyalty discount', priority: 'high', impact: 'High' },
  { id: 2, action: 'Upgrade to annual contract', priority: 'high', impact: 'High' },
  { id: 3, action: 'Schedule customer success call', priority: 'medium', impact: 'Medium' },
  { id: 4, action: 'Provide premium support access', priority: 'medium', impact: 'Medium' },
];

const supportHistory = [
  { id: 1, date: '2026-04-10', issue: 'Billing inquiry', status: 'Resolved', satisfaction: 4 },
  { id: 2, date: '2026-03-22', issue: 'Technical support', status: 'Resolved', satisfaction: 5 },
  { id: 3, date: '2026-02-15', issue: 'Service upgrade', status: 'Resolved', satisfaction: 5 },
];

export function CustomerDetail() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/customers">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">Customer Profile</h1>
          <p className="text-gray-600 mt-1">Detailed information and churn analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Edit Profile</Button>
          <Link to="/prediction">
            <Button variant="primary">
              <TrendingUp className="w-4 h-4 mr-2" />
              Update Prediction
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Summary */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Michael Chen</h2>
                  <p className="text-gray-600 mb-3">Customer ID: #MC-2048</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">michael.chen@email.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Joined Oct 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract Details */}
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Contract Type</p>
                  <p className="text-base font-medium text-gray-900">Month-to-Month</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tenure</p>
                  <p className="text-base font-medium text-gray-900">6 months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="text-base font-medium text-gray-900">Electronic Check</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Paperless Billing</p>
                  <p className="text-base font-medium text-gray-900">Yes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing & Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Billing & Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Charges</p>
                  <div className="flex items-baseline gap-1">
                    <DollarSign className="w-4 h-4 text-gray-900" />
                    <p className="text-2xl font-semibold text-gray-900">125.50</p>
                    <span className="text-sm text-gray-600">/month</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Charges</p>
                  <div className="flex items-baseline gap-1">
                    <DollarSign className="w-4 h-4 text-gray-900" />
                    <p className="text-2xl font-semibold text-gray-900">753.00</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Internet Service</p>
                  <p className="text-base font-medium text-gray-900">Fiber Optic</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Additional Services</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="info">Online Security</Badge>
                  <Badge variant="info">Online Backup</Badge>
                  <Badge variant="info">Tech Support</Badge>
                  <Badge variant="info">Streaming TV</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support History */}
          <Card>
            <CardHeader>
              <CardTitle>Support History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportHistory.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-medium text-gray-900">{ticket.issue}</p>
                        <Badge variant="success">{ticket.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{ticket.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < ticket.satisfaction ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Prediction & Analysis */}
        <div className="space-y-6">
          {/* Churn Prediction Card */}
          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <CardTitle className="text-red-900">Churn Prediction</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-red-100 mb-3">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-red-600">78%</p>
                    <p className="text-xs text-red-700 mt-1">Churn Risk</p>
                  </div>
                </div>
                <Badge variant="high" className="text-sm px-4 py-1">High Risk</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Last Updated</span>
                  <span className="font-medium text-gray-900">Today, 2:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Model Version</span>
                  <span className="font-medium text-gray-900">v2.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Confidence</span>
                  <span className="font-medium text-gray-900">94%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Importance */}
          <Card>
            <CardHeader>
              <CardTitle>Top Factors Affecting Churn</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={featureImportanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" stroke="#6B7280" />
                  <YAxis dataKey="feature" type="category" width={100} stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="importance" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Retention Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Suggested Retention Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {retentionActions.map((action) => (
                  <div key={action.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-1">{action.action}</p>
                      <div className="flex gap-2">
                        <Badge variant={action.priority === 'high' ? 'danger' : 'warning'}>
                          {action.priority.charAt(0).toUpperCase() + action.priority.slice(1)} Priority
                        </Badge>
                        <Badge variant="info">{action.impact} Impact</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="primary" className="w-full mt-4">
                Create Action Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
