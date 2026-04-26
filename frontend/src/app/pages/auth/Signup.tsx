import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { register } from "../../../services/authService";

export function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await register({
        username: formData.email,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });

      navigate("/login");
    } catch (err: any) {
      const data = err?.response?.data;

      if (data?.username) {
        setError(data.username[0]);
      } else if (data?.email) {
        setError(data.email[0]);
      } else if (data?.password) {
        setError(data.password[0]);
      } else if (data?.confirm_password) {
        setError(data.confirm_password[0]);
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-slate-900">
              ChurnPredict
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              Create an account
            </h2>
            <p className="text-slate-600">Get started with ChurnPredict today</p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="text"
              label="Full name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange("name")}
              required
            />

            <Input
              type="email"
              label="Email address"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange("password")}
              required
            />

            <Input
              type="password"
              label="Confirm password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              required
            />

            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 mt-0.5 text-slate-900 border-slate-300 rounded focus:ring-slate-900 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-slate-900 hover:text-slate-700 font-medium transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-slate-900 hover:text-slate-700 font-medium transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-sm text-slate-600">Already have an account? </span>
            <Link
              to="/login"
              className="text-sm text-slate-900 hover:text-slate-700 font-medium transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-8">
          © 2026 ChurnPredict. All rights reserved.
        </p>
      </div>
    </div>
  );
}