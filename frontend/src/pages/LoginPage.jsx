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
    <div className="min-h-[calc(100vh-72px)] px-4 py-10 flex items-center justify-center">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-400/15 via-transparent to-violet-500/10" />
          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-100">
              Live operations hub
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">Command your tasks with a futuristic control room.</h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
                Manage projects, track work, and switch between team views with a polished dashboard built to impress on first look.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Realtime", "task activity"],
                ["Smart", "member routing"],
                ["Fast", "workflow access"],
              ].map(([title, subtitle]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <div className="text-lg font-semibold text-white">{title}</div>
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <form onSubmit={onSubmit} className="rounded-4xl border border-white/10 bg-slate-950/65 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:p-8">
          <div className="mb-6 space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Secure sign in</p>
            <h2 className="text-3xl font-semibold text-white">Welcome back</h2>
            <p className="text-sm text-slate-400">Enter your workspace credentials to continue.</p>
          </div>
          {error && <p className="mb-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
          <div className="space-y-4">
            <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button disabled={loading} className="group w-full rounded-2xl bg-linear-to-r from-cyan-400 via-violet-500 to-emerald-400 px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 disabled:opacity-70">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-950/70 group-hover:animate-pulse" />
                {loading ? "Logging in..." : "Enter dashboard"}
              </span>
            </button>
          </div>
          <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-50">
            <p className="font-semibold text-cyan-100">Demo login hints</p>
            <div className="mt-2 space-y-1 text-cyan-50/90">
              <p><span className="font-medium text-cyan-100">Admin:</span> admin@demo.com / Admin@123</p>
              <p><span className="font-medium text-cyan-100">Member:</span> member@demo.com / Member@123</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-slate-400">
            No account? <Link to="/signup" className="font-medium text-cyan-200 hover:text-white">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
