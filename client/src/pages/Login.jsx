import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Login() {
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
      const token = res.data.access_token;

      localStorage.setItem("token", token);

      // If backend encodes role in token, you can decode it or 
      // fetch user info — for now, just redirect
      navigate("/employee-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6D5C2] to-[#F7F3EE] px-4">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#E5CBB8]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#4E3B31] mb-2">Welcome Back</h1>
          <p className="text-[#8C6E63]">Sign in to continue</p>
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
            <label htmlFor="name" className="block text-sm font-medium text-[#4E3B31] mb-2">
              Username
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#D9BFAE] rounded-lg focus:ring-2 focus:ring-[#A98065] focus:border-[#A98065] transition-colors"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#4E3B31] mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#D9BFAE] rounded-lg focus:ring-2 focus:ring-[#A98065] focus:border-[#A98065] transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A98065] text-white py-3 px-4 rounded-lg hover:bg-[#8C6E63] focus:ring-2 focus:ring-[#A98065] focus:ring-offset-2 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[#8C6E63]">
            Don’t have an account?{" "}
            <Link 
              to="/register" 
              className="text-[#A98065] hover:text-[#8C6E63] font-semibold transition-colors"
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
