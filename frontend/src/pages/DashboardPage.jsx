import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import "./DashboardPage.css";

const StatCard = ({ label, value }) => (
  <div className="card">
    <p className="metric-label">{label}</p>
    <p className="metric-value">{value ?? 0}</p>
  </div>
);

const PlaceholderLineChart = () => (
  <div className="chart">
    <svg width="100%" height="120" viewBox="0 0 400 120" preserveAspectRatio="none">
      <polyline fill="none" stroke="#06b6d4" strokeWidth="3" points="0,90 40,70 80,60 120,55 160,45 200,50 240,40 280,35 320,30 360,25 400,20" />
    </svg>
  </div>
);

const PlaceholderDonut = ({ percent = 68 }) => {
  const radius = 48;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;
  return (
    <div className="donut">
      <svg width="140" height="140" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e6eef6" strokeWidth="12" />
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray={`${circ}`} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 60 60)" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="16" fill="#111">{percent}%</text>
      </svg>
    </div>
  );
};

const DashboardPage = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axiosClient.get("/tasks/dashboard/stats");
        setStats(data);
      } catch (err) {
        // fallback: keep defaults
      } finally {
        setLoading(false);
      }
    };
    load();

    const saved = localStorage.getItem("ttm_theme");
    if (saved === "dark") setDark(true);
  }, []);

  useEffect(() => {
    const root = document.querySelector(".dashboard-root");
    if (root) {
      if (dark) {
        root.classList.add("dark");
        localStorage.setItem("ttm_theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("ttm_theme", "light");
      }
    }
  }, [dark]);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  const cards = [
    { label: "Total Tasks", value: stats.total },
    { label: "Completed", value: stats.completed },
    { label: "Pending", value: stats.pending },
    { label: "Overdue", value: stats.overdue },
  ];

  return (
    <div className={`dashboard-root ${dark ? "dark" : ""}`}>
      <div className="dashboard-container">
        <div className="header-row">
          <div className="page-title">Team Dashboard</div>
          <div className="controls">
            <button className="theme-toggle" onClick={() => setDark((d) => !d)}>
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        <div className="grid-main">
          <div>
            <div className="metrics-grid">
              {cards.map((c) => (
                <StatCard key={c.label} label={c.label} value={c.value} />
              ))}
            </div>

            <div className="card large-card" style={{marginTop:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontWeight:700}}>Project Analytics</div>
                <div style={{color:'#6b7280',fontSize:13}}>Last 30 days</div>
              </div>

              <div className="chart-row" style={{marginTop:12}}>
                <div style={{flex:'1 1 60%'}} className="chart">
                  <PlaceholderLineChart />
                </div>
                <div style={{width:160}}>
                  <div className="card" style={{padding:10}}>
                    <div style={{fontSize:13,color:'#6b7280'}}>Completion</div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:8}}>
                      <PlaceholderDonut percent={68} />
                    </div>
                    <div className="footer-note">68% tasks completed</div>
                  </div>
                </div>
              </div>

              <div style={{marginTop:12,display:'flex',gap:12}}>
                <div style={{flex:1}} className="card">
                  <div style={{fontWeight:700}}>Upcoming Milestones</div>
                  <div className="list">
                    <div className="list-item"><div>Design Review</div><div style={{color:'#06b6d4'}}>Mar 25</div></div>
                    <div className="list-item"><div>Release v1.1</div><div style={{color:'#fb923c'}}>Apr 02</div></div>
                    <div className="list-item"><div>Client Feedback</div><div style={{color:'#34d399'}}>Apr 10</div></div>
                  </div>
                </div>
                <div style={{width:220}} className="card">
                  <div style={{fontWeight:700}}>Team Snapshot</div>
                  <div style={{marginTop:8,display:'flex',flexDirection:'column',gap:8}}>
                    <div style={{display:'flex',justifyContent:'space-between'}}><div className="metric-label">Active</div><div>12</div></div>
                    <div style={{display:'flex',justifyContent:'space-between'}}><div className="metric-label">Overdue</div><div style={{color:'#ef4444'}}>3</div></div>
                    <div style={{display:'flex',justifyContent:'space-between'}}><div className="metric-label">Open PRs</div><div>7</div></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div>
            <div className="card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontWeight:700}}>Activity</div>
                <div style={{color:'#6b7280',fontSize:13}}>Real-time</div>
              </div>
              <div style={{marginTop:12}}>
                <PlaceholderLineChart />
              </div>

              <div style={{marginTop:12}}>
                <div className="calendar-placeholder">Calendar (placeholder)</div>
              </div>
            </div>

            <div className="card" style={{marginTop:12}}>
              <div style={{fontWeight:700}}>Messages</div>
              <div className="list" style={{marginTop:8}}>
                <div className="list-item"><div><strong>Alice</strong><div style={{fontSize:12,color:'#6b7280'}}>Added a new task</div></div><div>2h</div></div>
                <div className="list-item"><div><strong>Bob</strong><div style={{fontSize:12,color:'#6b7280'}}>Commented on issue</div></div><div>5h</div></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
