import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "member" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosClient.post("/auth/signup", form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] px-4 py-10 flex items-center justify-center">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="rounded-[32px] border border-white/10 bg-slate-950/65 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:p-8">
          <div className="mb-6 space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Create access</p>
            <h2 className="text-3xl font-semibold text-white">Join the mission</h2>
            <p className="text-sm text-slate-400">Set up a new admin or member account in seconds.</p>
          </div>
          {error && <p className="mb-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
          <div className="space-y-4">
            <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <select className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20" onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <button disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-violet-500/20 disabled:opacity-70">
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>
          <p className="mt-5 text-sm text-slate-400">Already have an account? <Link to="/login" className="font-medium text-cyan-200 hover:text-white">Login</Link></p>
        </section>

        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/15" />
          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-violet-100">
              Onboard in style
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">One account, full command of tasks, teams, and timelines.</h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
                Clean onboarding, fast access, and an interface that feels like a premium operations console.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Admin tools", "Create and assign"],
                ["Member mode", "Track and update"],
                ["Analytics", "See progress instantly"],
                ["Speed", "Move without friction"],
              ].map(([title, subtitle]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <div className="text-base font-semibold text-white">{title}</div>
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignupPage;
