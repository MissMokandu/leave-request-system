import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", formData);
      const { access_token, user } = res.data;

      localStorage.setItem("token", access_token);
      
      const userData = { ...user, token: access_token };
      onLogin(userData);

      // Redirect based on role
      if (user.role === 'admin') {
        navigate("/admin-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F3F0] to-[#E8E2D4] px-4">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#D4C5B9]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#6B5B73] mb-2">Welcome Back</h1>
          <p className="text-[#8B9A7A]">Sign in to continue</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#6B5B73] mb-2">
              Username
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#D4C5B9] rounded-lg focus:ring-2 focus:ring-[#8B9A7A] focus:border-[#8B9A7A] transition-colors"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#6B5B73] mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#D4C5B9] rounded-lg focus:ring-2 focus:ring-[#8B9A7A] focus:border-[#8B9A7A] transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B9A7A] text-white py-3 px-4 rounded-lg hover:bg-[#6B5B73] focus:ring-2 focus:ring-[#8B9A7A] focus:ring-offset-2 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[#8B9A7A]">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-[#6B5B73] hover:text-[#8B9A7A] font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;