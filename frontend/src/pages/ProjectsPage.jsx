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
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Projects</h2>
      {user.role === "admin" && (
        <form onSubmit={createProject} className="bg-white p-4 rounded-xl border space-y-3">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <input className="w-full border rounded-lg p-2" placeholder="Project name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <textarea className="w-full border rounded-lg p-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <select multiple className="w-full border rounded-lg p-2" onChange={(e) => setForm({ ...form, members: Array.from(e.target.selectedOptions, (o) => o.value) })}>
            {users.map((u) => <option key={u._id} value={u._id}>{u.name} ({u.role})</option>)}
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Create Project</button>
        </form>
      )}
      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded-xl border">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-slate-600">{p.description}</p>
            <p className="text-xs mt-2 text-slate-500">Members: {p.members?.length || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
