const Task = require("../models/Task");
const Project = require("../models/Project");

const decorateTask = (task) => {
  const due = new Date(task.dueDate);
  const now = new Date();
  return { ...task.toObject(), isOverdue: task.status !== "completed" && due < now };
};

const createTask = async (req, res, next) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const task = await Task.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(decorateTask(task));
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? {} : { assignedTo: req.user._id };
    const tasks = await Task.find(query)
      .populate("assignedTo", "name email role")
      .populate("projectId", "name description");
    res.json(tasks.map(decorateTask));
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingTask = await Task.findById(id);
    if (!existingTask) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "admin" && existingTask.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only update your own tasks" });
    }

    const updatePayload = req.user.role === "admin" ? req.body : { status: req.body.status };
    const task = await Task.findByIdAndUpdate(id, updatePayload, { new: true })
      .populate("assignedTo", "name email role")
      .populate("projectId", "name description");
    res.json(decorateTask(task));
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? {} : { assignedTo: req.user._id };
    const tasks = await Task.find(query);
    const now = new Date();

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = tasks.filter((t) => t.status !== "completed").length;
    const overdue = tasks.filter((t) => t.status !== "completed" && new Date(t.dueDate) < now).length;

    res.json({ total, completed, pending, overdue, userSpecific: req.user.role !== "admin" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, getDashboardStats };
