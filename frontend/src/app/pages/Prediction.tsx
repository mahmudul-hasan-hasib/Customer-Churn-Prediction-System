import { useState } from 'react';
import { AlertCircle, TrendingUp, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Prediction() {
  const [formData, setFormData] = useState({
    tenure: '',
    monthlyCharges: '',
    contractType: 'Month-to-Month',
    paymentMethod: 'Electronic check',
    internetService: 'Fiber optic',
    totalCharges: '',
  });

  const [prediction, setPrediction] = useState<{
    probability: number;
    risk: 'low' | 'medium' | 'high';
    features: { feature: string; importance: number }[];
  } | null>(null);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();

    const mockPrediction = {
      probability: Math.floor(Math.random() * 100),
      risk: 'medium' as 'low' | 'medium' | 'high',
      features: [
        { feature: 'Tenure', importance: 85 },
        { feature: 'Monthly Charges', importance: 72 },
        { feature: 'Contract Type', importance: 68 },
        { feature: 'Total Charges', importance: 54 },
        { feature: 'Payment Method', importance: 42 },
      ],
    };

    if (mockPrediction.probability < 30) {
      mockPrediction.risk = 'low';
    } else if (mockPrediction.probability >= 30 && mockPrediction.probability < 70) {
      mockPrediction.risk = 'medium';
    } else {
      mockPrediction.risk = 'high';
    }

    setPrediction(mockPrediction);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Churn Prediction</h1>
        <p className="text-gray-600 mt-1">Predict customer churn probability using machine learning</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePredict} className="space-y-4">
              <Input
                type="number"
                label="Tenure (months)"
                placeholder="e.g., 12"
                value={formData.tenure}
                onChange={handleChange('tenure')}
                required
              />

              <Input
                type="number"
                step="0.01"
                label="Monthly Charges ($)"
                placeholder="e.g., 89.99"
                value={formData.monthlyCharges}
                onChange={handleChange('monthlyCharges')}
                required
              />

              <Input
                type="number"
                step="0.01"
                label="Total Charges ($)"
                placeholder="e.g., 1079.88"
                value={formData.totalCharges}
                onChange={handleChange('totalCharges')}
                required
              />

              <Select
                label="Contract Type"
                options={[
                  { value: 'Month-to-Month', label: 'Month-to-Month' },
                  { value: 'One Year', label: 'One Year' },
                  { value: 'Two Year', label: 'Two Year' },
                ]}
                value={formData.contractType}
                onChange={handleChange('contractType')}
              />

              <Select
                label="Payment Method"
                options={[
                  { value: 'Electronic check', label: 'Electronic Check' },
                  { value: 'Mailed check', label: 'Mailed Check' },
                  { value: 'Bank transfer', label: 'Bank Transfer (automatic)' },
                  { value: 'Credit card', label: 'Credit Card (automatic)' },
                ]}
                value={formData.paymentMethod}
                onChange={handleChange('paymentMethod')}
              />

              <Select
                label="Internet Service"
                options={[
                  { value: 'DSL', label: 'DSL' },
                  { value: 'Fiber optic', label: 'Fiber Optic' },
                  { value: 'No', label: 'No Internet Service' },
                ]}
                value={formData.internetService}
                onChange={handleChange('internetService')}
              />

              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" className="flex-1">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Predict Churn
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setFormData({
                      tenure: '',
                      monthlyCharges: '',
                      contractType: 'Month-to-Month',
                      paymentMethod: 'Electronic check',
                      internetService: 'Fiber optic',
                      totalCharges: '',
                    });
                    setPrediction(null);
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Column - Prediction Results */}
        <div className="space-y-6">
          {!prediction ? (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Prediction Yet</h3>
                  <p className="text-gray-600">
                    Fill out the form and click "Predict Churn" to see the results
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Prediction Result Card */}
              <Card
                className={`border-2 ${
                  prediction.risk === 'high'
                    ? 'border-red-200 bg-red-50'
                    : prediction.risk === 'medium'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-green-200 bg-green-50'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle
                      className={`w-5 h-5 ${
                        prediction.risk === 'high'
                          ? 'text-red-600'
                          : prediction.risk === 'medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}
                    />
                    <CardTitle
                      className={
                        prediction.risk === 'high'
                          ? 'text-red-900'
                          : prediction.risk === 'medium'
                          ? 'text-yellow-900'
                          : 'text-green-900'
                      }
                    >
                      Prediction Result
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-3 ${
                        prediction.risk === 'high'
                          ? 'bg-red-100'
                          : prediction.risk === 'medium'
                          ? 'bg-yellow-100'
                          : 'bg-green-100'
                      }`}
                    >
                      <div className="text-center">
                        <p
                          className={`text-4xl font-bold ${
                            prediction.risk === 'high'
                              ? 'text-red-600'
                              : prediction.risk === 'medium'
                              ? 'text-yellow-600'
                              : 'text-green-600'
                          }`}
                        >
                          {prediction.probability}%
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            prediction.risk === 'high'
                              ? 'text-red-700'
                              : prediction.risk === 'medium'
                              ? 'text-yellow-700'
                              : 'text-green-700'
                          }`}
                        >
                          Churn Risk
                        </p>
                      </div>
                    </div>
                    <Badge variant={prediction.risk} className="text-sm px-4 py-1">
                      {prediction.risk.charAt(0).toUpperCase() + prediction.risk.slice(1)} Risk
                    </Badge>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        {prediction.risk === 'high'
                          ? 'This customer has a high likelihood of churning. Immediate intervention is recommended.'
                          : prediction.risk === 'medium'
                          ? 'This customer shows moderate churn risk. Consider proactive engagement strategies.'
                          : 'This customer has a low churn risk. Continue providing excellent service.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature Importance */}
              <Card>
                <CardHeader>
                  <CardTitle>Feature Importance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Top factors contributing to this prediction:
                  </p>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={prediction.features} layout="vertical">
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

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {prediction.risk === 'high' ? (
                      <>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Contact customer immediately with retention offer
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Offer upgrade to annual contract with discount
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Schedule customer success call within 48 hours
                          </p>
                        </div>
                      </>
                    ) : prediction.risk === 'medium' ? (
                      <>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Send personalized engagement email
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Review usage patterns and suggest optimizations
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Offer loyalty rewards program enrollment
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Continue standard engagement practices
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Consider for referral program participation
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Quarterly satisfaction check-in
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
