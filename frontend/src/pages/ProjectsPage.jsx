import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const ProjectsPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", members: [] });
  const [error, setError] = useState("");

  const load = async () => {
    const { data } = await axiosClient.get("/projects");
    setProjects(data);
    if (user.role === "admin") {
      const usersRes = await axiosClient.get("/users");
      setUsers(usersRes.data);
    }
  };

  useEffect(() => { load(); }, []);

  const createProject = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/projects", form);
      setForm({ name: "", description: "", members: [] });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create project");
    }
  };

  return (
    <div className="space-y-6 p-6 text-slate-100">
      <div>
        <h2 className="text-2xl font-semibold">Projects</h2>
        <p className="mt-1 text-sm text-slate-300">View project cards on a darker surface so names and descriptions stay readable.</p>
      </div>
      {user.role === "admin" && (
        <form onSubmit={createProject} className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          {error && <p className="text-sm text-rose-200">{error}</p>}
          <input className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300/60" placeholder="Project name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <textarea className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300/60" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <select multiple className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-cyan-300/60" onChange={(e) => setForm({ ...form, members: Array.from(e.target.selectedOptions, (o) => o.value) })}>
            {users.map((u) => <option key={u._id} value={u._id}>{u.name} ({u.role})</option>)}
          </select>
          <button className="rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400 px-4 py-2 font-semibold text-slate-950">Create Project</button>
        </form>
      )}
      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p._id} className="rounded-2xl border border-white/10 bg-slate-950/65 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.2)] backdrop-blur-xl">
            <h3 className="font-semibold text-white">{p.name}</h3>
            <p className="mt-2 text-sm text-slate-300">{p.description}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-cyan-200/70">Members: {p.members?.length || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
