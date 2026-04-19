import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";
import { predictChurn } from "../../services/predictionService";

export function Prediction() {
  const [formData, setFormData] = useState({
    age: 30,
    gender: "Male",
    tenure: 12,
    usage_frequency: 10,
    support_calls: 1,
    payment_delay: 2,
    subscription_type: "Standard",
    contract_length: "Monthly",
    total_spend: 500,
    last_interaction: 7,
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePredict = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await predictChurn(formData);
      setResult(res);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Prediction failed. Check pipeline file."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Churn Prediction
      </h1>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FORM */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            <input
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={(e) => handleChange("age", Number(e.target.value))}
              className="input"
            />

            <Select
              label="Gender"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            />

            <input
              type="number"
              placeholder="Tenure (months)"
              value={formData.tenure}
              onChange={(e) => handleChange("tenure", Number(e.target.value))}
              className="input"
            />

            <input
              type="number"
              placeholder="Usage Frequency"
              value={formData.usage_frequency}
              onChange={(e) =>
                handleChange("usage_frequency", Number(e.target.value))
              }
              className="input"
            />

            <input
              type="number"
              placeholder="Support Calls"
              value={formData.support_calls}
              onChange={(e) =>
                handleChange("support_calls", Number(e.target.value))
              }
              className="input"
            />

            <input
              type="number"
              placeholder="Payment Delay"
              value={formData.payment_delay}
              onChange={(e) =>
                handleChange("payment_delay", Number(e.target.value))
              }
              className="input"
            />

            <Select
              label="Subscription Type"
              options={[
                { value: "Standard", label: "Standard" },
                { value: "Basic", label: "Basic" },
                { value: "Premium", label: "Premium" },
              ]}
              value={formData.subscription_type}
              onChange={(e) =>
                handleChange("subscription_type", e.target.value)
              }
            />

            <Select
              label="Contract Length"
              options={[
                { value: "Monthly", label: "Monthly" },
                { value: "Quarterly", label: "Quarterly" },
                { value: "Annual", label: "Annual" },
              ]}
              value={formData.contract_length}
              onChange={(e) =>
                handleChange("contract_length", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Total Spend"
              value={formData.total_spend}
              onChange={(e) =>
                handleChange("total_spend", Number(e.target.value))
              }
              className="input"
            />

            <input
              type="number"
              placeholder="Last Interaction (days)"
              value={formData.last_interaction}
              onChange={(e) =>
                handleChange("last_interaction", Number(e.target.value))
              }
              className="input"
            />

            <Button onClick={handlePredict} disabled={loading}>
              {loading ? "Predicting..." : "Predict Churn"}
            </Button>
          </CardContent>
        </Card>

        {/* RESULT */}
        <Card>
          <CardHeader>
            <CardTitle>Prediction Result</CardTitle>
          </CardHeader>
          <CardContent>
            {!result ? (
              <p className="text-gray-500 text-sm">
                Fill the form and click predict
              </p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Probability</p>
                  <p className="text-3xl font-bold">
                    {Math.round(result.probability * 100)}%
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Risk Level</p>
                  <Badge variant={result.risk_level}>
                    {result.risk_level}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Prediction</p>
                  <p className="text-lg font-semibold">
                    {result.prediction === 1 ? "Will Churn" : "Will Stay"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}