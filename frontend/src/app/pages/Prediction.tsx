import { useState } from "react";
import { predictChurn, type PredictionPayload } from "../../services/predictionService";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Select } from "../components/ui/Select";

export function Prediction() {
  const [formData, setFormData] = useState<PredictionPayload>({
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

  const [result, setResult] = useState<null | {
    prediction: number;
    probability: number;
    risk_level: "low" | "medium" | "high";
  }>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputClassName =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const handleChange = (key: keyof PredictionPayload, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePredict = async () => {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await predictChurn(formData);
      setResult(res);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.error ||
          "Prediction failed. Please check backend and pipeline file."
      );
    } finally {
      setLoading(false);
    }
  };

  const riskBadgeVariant = result?.risk_level || "low";

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Churn Prediction</h1>
        <p className="mt-1 text-sm text-slate-600">
          Enter customer behavior and subscription data to predict churn risk.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Input</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.age}
                  onChange={(e) => handleChange("age", Number(e.target.value))}
                  className={inputClassName}
                />
              </div>

              <div>
                <Select
                  label="Gender"
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ]}
                  value={formData.gender}
                  onChange={(e) =>
                    handleChange("gender", e.target.value as "Male" | "Female")
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tenure (months)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.tenure}
                  onChange={(e) => handleChange("tenure", Number(e.target.value))}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Usage Frequency
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.usage_frequency}
                  onChange={(e) =>
                    handleChange("usage_frequency", Number(e.target.value))
                  }
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Support Calls
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.support_calls}
                  onChange={(e) =>
                    handleChange("support_calls", Number(e.target.value))
                  }
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Payment Delay
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.payment_delay}
                  onChange={(e) =>
                    handleChange("payment_delay", Number(e.target.value))
                  }
                  className={inputClassName}
                />
              </div>

              <div>
                <Select
                  label="Subscription Type"
                  options={[
                    { value: "Standard", label: "Standard" },
                    { value: "Basic", label: "Basic" },
                    { value: "Premium", label: "Premium" },
                  ]}
                  value={formData.subscription_type}
                  onChange={(e) =>
                    handleChange(
                      "subscription_type",
                      e.target.value as "Standard" | "Basic" | "Premium"
                    )
                  }
                />
              </div>

              <div>
                <Select
                  label="Contract Length"
                  options={[
                    { value: "Monthly", label: "Monthly" },
                    { value: "Quarterly", label: "Quarterly" },
                    { value: "Annual", label: "Annual" },
                  ]}
                  value={formData.contract_length}
                  onChange={(e) =>
                    handleChange(
                      "contract_length",
                      e.target.value as "Annual" | "Monthly" | "Quarterly"
                    )
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Total Spend
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={formData.total_spend}
                  onChange={(e) =>
                    handleChange("total_spend", Number(e.target.value))
                  }
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Last Interaction (days)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.last_interaction}
                  onChange={(e) =>
                    handleChange("last_interaction", Number(e.target.value))
                  }
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="pt-2">
              <Button onClick={handlePredict} disabled={loading}>
                {loading ? "Predicting..." : "Predict Churn"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        <Card>
          <CardHeader>
            <CardTitle>Prediction Result</CardTitle>
          </CardHeader>

          <CardContent>
            {!result ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-500">
                  Fill the form and click predict to see the result.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-xl bg-slate-50 p-5 border border-slate-200">
                  <p className="text-sm text-slate-600 mb-2">Churn Probability</p>
                  <p className="text-4xl font-bold text-slate-900">
                    {Math.round(result.probability * 100)}%
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-5 border border-slate-200">
                  <p className="text-sm text-slate-600 mb-2">Risk Level</p>
                  <Badge variant={riskBadgeVariant}>
                    {result.risk_level.charAt(0).toUpperCase() +
                      result.risk_level.slice(1)}
                  </Badge>
                </div>

                <div className="rounded-xl bg-slate-50 p-5 border border-slate-200">
                  <p className="text-sm text-slate-600 mb-2">Prediction</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {result.prediction === 1 ? "Will Churn" : "Will Stay"}
                  </p>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-sm text-blue-800">
                    This prediction is generated from the current trained churn model.
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