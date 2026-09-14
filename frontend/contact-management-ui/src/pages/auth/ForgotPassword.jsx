import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, LockKeyhole } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Password reset requested for:", email);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Application Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white mb-4">
            <LockKeyhole size={28} />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Contact Management System
          </h1>

          <p className="text-slate-500 mt-2">Recover your account securely</p>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-800">
              Forgot Password?
            </h2>

            <p className="text-slate-500 mt-2 text-sm leading-6">
              Enter your registered email address and we will send you
              instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  className="w-full border border-slate-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 Contact Management System
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
