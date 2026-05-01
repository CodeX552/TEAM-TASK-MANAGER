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
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Tasks</h2>
      {user.role === "admin" && (
        <form onSubmit={createTask} className="bg-white p-4 rounded-xl border grid md:grid-cols-2 gap-3">
          <input className="border rounded-lg p-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="border rounded-lg p-2" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          <textarea className="border rounded-lg p-2 md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <select className="border rounded-lg p-2" value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}>
            <option value="">Select project</option>
            {projects.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          <select className="border rounded-lg p-2" value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}>
            <option value="">Assign to user</option>
            {users.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg md:col-span-2">Create Task</button>
        </form>
      )}
      <div className="grid gap-4">
        {tasks.map((t) => (
          <div key={t._id} className="bg-white p-4 rounded-xl border">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-sm text-slate-600">{t.description}</p>
                <p className="text-xs text-slate-500 mt-1">Due: {new Date(t.dueDate).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${t.isOverdue ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"}`}>
                {t.isOverdue ? "Overdue" : t.status}
              </span>
            </div>
            <select className="mt-3 border rounded-lg p-2" value={t.status} onChange={(e) => updateStatus(t._id, e.target.value)}>
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
