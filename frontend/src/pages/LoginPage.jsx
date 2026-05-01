import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosClient.post("/auth/login", form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="bg-white w-full max-w-md rounded-2xl p-6 shadow-sm space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <input className="w-full border rounded-lg p-2.5" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="w-full border rounded-lg p-2.5" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button disabled={loading} className="w-full bg-blue-600 text-white rounded-lg p-2.5">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm">No account? <Link to="/signup" className="text-blue-600">Signup</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
