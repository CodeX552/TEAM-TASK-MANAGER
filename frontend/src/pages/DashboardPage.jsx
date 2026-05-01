import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axiosClient.get("/tasks/dashboard/stats");
        setStats(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  const cards = [
    { label: "Total Tasks", value: stats.total },
    { label: "Completed", value: stats.completed },
    { label: "Pending", value: stats.pending },
    { label: "Overdue", value: stats.overdue },
  ];

  return (
    <div className="p-6 text-slate-100">
      <h2 className="mb-2 text-2xl font-semibold">Dashboard</h2>
      <p className="mb-5 max-w-2xl text-sm text-slate-300">Track project progress and task status from a clear, high-contrast overview.</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">{c.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
