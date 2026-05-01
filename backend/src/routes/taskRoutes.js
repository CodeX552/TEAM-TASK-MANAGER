const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getDashboardStats,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validateRequest = require("../middleware/validateRequest");
const { createTaskValidator, updateTaskValidator, taskIdValidator } = require("../validators/taskValidators");

const router = express.Router();

router.use(authMiddleware);
router.get("/", getTasks);
router.get("/dashboard/stats", getDashboardStats);
router.post("/", roleMiddleware("admin"), createTaskValidator, validateRequest, createTask);
router.put("/:id", updateTaskValidator, validateRequest, updateTask);
router.delete("/:id", roleMiddleware("admin"), taskIdValidator, validateRequest, deleteTask);

module.exports = router;
