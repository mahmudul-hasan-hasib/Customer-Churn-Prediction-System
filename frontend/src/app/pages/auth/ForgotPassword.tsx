import { useState } from 'react';
import { Link } from 'react-router';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-slate-900">ChurnPredict</span>
          </div>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 p-8">
          {!submitted ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">Reset password</h2>
                <p className="text-slate-600">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  type="email"
                  label="Email address"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Button type="submit" variant="primary" className="w-full">
                  Send reset link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm shadow-emerald-200/50">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Check your email</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We've sent a password reset link to <span className="font-medium text-slate-900">{email}</span>
              </p>
              <Button onClick={() => setSubmitted(false)} variant="secondary" className="w-full">
                Send another link
              </Button>
            </div>
          )}

          <div className="mt-8">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm text-slate-900 hover:text-slate-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
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
