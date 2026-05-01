import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  if (!user) return null;

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/projects", label: "Projects" },
    { to: "/tasks", label: "Tasks" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl px-6 py-3 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 shadow-lg shadow-cyan-500/20" />
        <div>
          <div className="font-semibold tracking-wide text-white">Team Task Manager</div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">Neural workflow</div>
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`rounded-full px-4 py-2 text-sm border ${pathname === link.to ? "border-cyan-300/60 bg-cyan-400/12 text-cyan-100 shadow-[0_0_24px_rgba(103,232,249,0.15)]" : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"}`}
          >
            {link.label}
          </Link>
        ))}
        <span className="text-xs rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-200 uppercase tracking-[0.18em]">
          {user.role}
        </span>
        <button onClick={logout} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:border-cyan-300/60 hover:bg-cyan-400/10">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
