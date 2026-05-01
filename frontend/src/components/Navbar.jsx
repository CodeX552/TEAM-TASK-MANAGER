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
    <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
      <div className="font-semibold text-slate-800">Team Task Manager</div>
      <div className="flex items-center gap-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-sm ${pathname === link.to ? "text-blue-600 font-medium" : "text-slate-600"}`}
          >
            {link.label}
          </Link>
        ))}
        <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{user.role}</span>
        <button onClick={logout} className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-lg">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
