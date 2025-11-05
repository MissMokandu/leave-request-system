import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Register({ onRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "employee",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F3F0] to-[#E8E2D4] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#D4C5B9]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#6B5B73] mb-2">
            Create Account
          </h1>
          <p className="text-[#8B9A7A]">Join LeaveManager today</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#6B5B73] mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#D4C5B9] rounded-lg focus:ring-2 focus:ring-[#8B9A7A] focus:border-[#8B9A7A] transition-colors"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#6B5B73] mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#D4C5B9] rounded-lg focus:ring-2 focus:ring-[#8B9A7A] focus:border-[#8B9A7A] transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#6B5B73] mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#D4C5B9] rounded-lg focus:ring-2 focus:ring-[#8B9A7A] focus:border-[#8B9A7A] transition-colors"
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#6B5B73] mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#D4C5B9] rounded-lg focus:ring-2 focus:ring-[#8B9A7A] focus:border-[#8B9A7A] transition-colors"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-[#6B5B73] mb-2"
            >
              Account Type
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#D4C5B9] rounded-lg focus:ring-2 focus:ring-[#8B9A7A] focus:border-[#8B9A7A] transition-colors"
            >
              <option value="employee">Employee</option>
              <option value="admin">Administrator</option>
            </select>
            <p className="text-xs text-[#8B9A7A] mt-1">
              {formData.role === "admin"
                ? "Admins can manage all employee leave requests"
                : "Employees can submit and track their own leave requests"}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B9A7A] text-white py-3 px-4 rounded-lg hover:bg-[#6B5B73] focus:ring-2 focus:ring-[#8B9A7A] focus:ring-offset-2 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[#8B9A7A]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#6B5B73] hover:text-[#8B9A7A] font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;