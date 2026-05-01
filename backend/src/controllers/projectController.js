const Project = require("../models/Project");

const createProject = async (req, res, next) => {
  try {
    const { name, description, members = [] } = req.body;
    const memberIds = [...new Set([...members, req.user._id.toString()])];
    const project = await Project.create({
      name,
      description,
      members: memberIds,
      createdBy: req.user._id,
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? {} : { members: req.user._id };
    const projects = await Project.find(query).populate("members", "name email role");
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const project = await Project.findByIdAndUpdate(id, update, { new: true }).populate(
      "members",
      "name email role"
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProject, getProjects, updateProject, deleteProject };
