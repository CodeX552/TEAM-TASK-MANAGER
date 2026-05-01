import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const TasksPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "todo",
    dueDate: "",
    projectId: "",
  });

  const load = async () => {
    const [{ data: taskData }, { data: projectData }] = await Promise.all([
      axiosClient.get("/tasks"),
      axiosClient.get("/projects"),
    ]);
    setTasks(taskData);
    setProjects(projectData);
    if (user.role === "admin") {
      const { data } = await axiosClient.get("/users");
      setUsers(data);
    }
  };

  useEffect(() => { load(); }, []);

  const createTask = async (e) => {
    e.preventDefault();
    await axiosClient.post("/tasks", form);
    setForm({ title: "", description: "", assignedTo: "", status: "todo", dueDate: "", projectId: "" });
    load();
  };

  const updateStatus = async (id, status) => {
    await axiosClient.put(`/tasks/${id}`, { status });
    load();
  };

  return (
    <div className="space-y-6 p-6 text-slate-100">
      <div>
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <p className="mt-1 text-sm text-slate-300">Task cards now use stronger contrast so status, due dates, and descriptions stay readable.</p>
      </div>
      {user.role === "admin" && (
        <form onSubmit={createTask} className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl md:grid-cols-2">
          <input className="rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300/60" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-cyan-300/60" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          <textarea className="rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-300/60 md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <select className="rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-cyan-300/60" value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}>
            <option value="">Select project</option>
            {projects.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          <select className="rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-cyan-300/60" value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}>
            <option value="">Assign to user</option>
            {users.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          <button className="rounded-xl bg-linear-to-r from-cyan-400 via-violet-500 to-emerald-400 px-4 py-2 font-semibold text-slate-950 md:col-span-2">Create Task</button>
        </form>
      )}
      <div className="grid gap-4">
        {tasks.map((t) => (
          <div key={t._id} className="rounded-2xl border border-white/10 bg-slate-950/65 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.2)] backdrop-blur-xl">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-semibold text-white">{t.title}</h3>
                <p className="text-sm text-slate-300">{t.description}</p>
                <p className="mt-1 text-xs text-slate-400">Due: {new Date(t.dueDate).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${t.isOverdue ? "bg-red-500/15 text-red-200" : "bg-cyan-400/10 text-cyan-100"}`}>
                {t.isOverdue ? "Overdue" : t.status}
              </span>
            </div>
            <select className="mt-3 rounded-xl border border-white/10 bg-white/5 p-2.5 text-white outline-none focus:border-cyan-300/60" value={t.status} onChange={(e) => updateStatus(t._id, e.target.value)}>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
