require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Project = require("./models/Project");
const Task = require("./models/Task");

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([User.deleteMany({}), Project.deleteMany({}), Task.deleteMany({})]);

    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const memberPassword = await bcrypt.hash("Member@123", 10);

    const [admin, member] = await User.create([
      {
        name: "Admin User",
        email: "admin@demo.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "Member User",
        email: "member@demo.com",
        password: memberPassword,
        role: "member",
      },
    ]);

    const project = await Project.create({
      name: "Demo Website Launch",
      description: "End-to-end launch planning for demo environment",
      members: [admin._id, member._id],
      createdBy: admin._id,
    });

    const now = new Date();
    const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    await Task.create([
      {
        title: "Create project plan",
        description: "Draft timeline and milestones",
        assignedTo: member._id,
        status: "in_progress",
        dueDate: inThreeDays,
        projectId: project._id,
        createdBy: admin._id,
      },
      {
        title: "Prepare QA checklist",
        description: "Build checklist for final testing",
        assignedTo: member._id,
        status: "todo",
        dueDate: yesterday,
        projectId: project._id,
        createdBy: admin._id,
      },
    ]);

    console.log("Seed complete");
    console.log("Admin login: admin@demo.com / Admin@123");
    console.log("Member login: member@demo.com / Member@123");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seed();
