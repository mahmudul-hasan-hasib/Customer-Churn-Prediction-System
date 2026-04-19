import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getCustomerById, predictCustomer } from "../../services/customerService";

export function CustomerDetail() {
  const { id } = useParams();

  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Load customer
  useEffect(() => {
    const loadCustomer = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getCustomerById(id as string);
        setCustomer(data);
      } catch (err: any) {
        setError("Failed to load customer details.");
      } finally {
        setLoading(false);
      }
    };

    loadCustomer();
  }, [id]);

  // 🔹 Prediction update
  const handleUpdatePrediction = async () => {
    try {
      setPredicting(true);
      const data = await predictCustomer(id as string);
      setCustomer(data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Prediction update failed.");
    } finally {
      setPredicting(false);
    }
  };

  // 🔹 UI states
  if (loading) {
    return <div className="p-6">Loading customer details...</div>;
  }

  if (error && !customer) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!customer) {
    return <div className="p-6">Customer not found.</div>;
  }

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

        <Button variant="primary" onClick={handleUpdatePrediction} disabled={predicting}>
          <TrendingUp className="w-4 h-4 mr-2" />
          {predicting ? "Updating..." : "Update Prediction"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {customer.name}
                  </h2>

                  <p className="text-gray-600 mb-3">
                    Customer ID: #{customer.customer_code}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{customer.email || "N/A"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{customer.phone || "N/A"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{customer.location || "N/A"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {customer.joined_date
                          ? `Joined ${customer.joined_date}`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract */}
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Contract Type</p>
                <p className="font-medium">
                  {customer.contract_length || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Tenure</p>
                <p className="font-medium">{customer.tenure} months</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium">
                  {customer.payment_method || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Paperless Billing</p>
                <p className="font-medium">
                  {customer.paperless_billing ? "Yes" : "No"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Billing */}
          <Card>
            <CardHeader>
              <CardTitle>Billing & Usage</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm">Monthly</p>
                  <p className="text-xl">{customer.monthly_charges}</p>
                </div>

                <div>
                  <p className="text-sm">Total</p>
                  <p className="text-xl">{customer.total_spend}</p>
                </div>

                <div>
                  <p className="text-sm">Internet</p>
                  <p>{customer.internet_service || "N/A"}</p>
                </div>
              </div>

              <div className="mt-4">
                {customer.additional_services?.map((s: string, i: number) => (
                  <Badge key={i} variant="info">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Support History</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {customer.support_history?.map((t: any) => (
                <div key={t.id} className="p-4 bg-gray-50 rounded-lg">
                  <p>{t.issue}</p>
                  <p className="text-sm text-gray-600">{t.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Prediction */}
          <Card>
            <CardHeader>
              <CardTitle>Churn Prediction</CardTitle>
            </CardHeader>

            <CardContent className="text-center">
              <p className="text-4xl font-bold text-red-600">
                {Math.round((customer.churn_probability || 0) * 100)}%
              </p>

              <Badge variant="high">
                {customer.risk_level
                  ?.charAt(0)
                  .toUpperCase() + customer.risk_level?.slice(1)}{" "}
                Risk
              </Badge>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top Factors Affecting Churn</CardTitle>
            </CardHeader>

            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={customer.feature_importance || []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="feature" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="importance" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Suggested Retention Actions</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {customer.retention_actions?.map((a: any) => (
                <div key={a.id} className="p-3 bg-gray-50 rounded-lg">
                  <p>{a.action}</p>

                  <div className="flex gap-2 mt-1">
                    <Badge variant={a.priority === "high" ? "danger" : "warning"}>
                      {a.priority}
                    </Badge>

                    <Badge variant="info">{a.impact}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}