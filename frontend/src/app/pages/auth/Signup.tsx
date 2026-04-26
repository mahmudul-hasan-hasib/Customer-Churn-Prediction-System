import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { register } from "../../../services/authService";

export function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Auto-generate username from name
  useEffect(() => {
    if (formData.name) {
      const generated = formData.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");

      setFormData((prev) => ({
        ...prev,
        username: generated,
      }));
    }
  }, [formData.name]);

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
        username: formData.username,
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
        {/* Logo */}
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

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8">
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
            {/* Name */}
            <Input
              type="text"
              label="Full name"
              placeholder="Raufun Nahar"
              value={formData.name}
              onChange={handleChange("name")}
              required
            />

            {/* Username */}
            <Input
              type="text"
              label="Username"
              placeholder="raufun_nahar"
              value={formData.username}
              onChange={handleChange("username")}
              required
            />

            <p className="text-xs text-slate-500 -mt-3">
              This will be your login username
            </p>

            {/* Email */}
            <Input
              type="email"
              label="Email address"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />

            {/* Password */}
            <Input
              type="password"
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange("password")}
              required
            />

            {/* Confirm */}
            <Input
              type="password"
              label="Confirm password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              required
            />

            {/* Terms */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-0.5 cursor-pointer"
              />
              <span className="text-sm text-slate-600">
                I agree to the Terms & Privacy Policy
              </span>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-sm text-slate-600">
              Already have an account?
            </span>{" "}
            <Link to="/login" className="text-slate-900 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}