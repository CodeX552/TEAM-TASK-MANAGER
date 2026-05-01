const express = require("express");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  createProjectValidator,
  updateProjectValidator,
  projectIdValidator,
} = require("../validators/projectValidators");

const router = express.Router();

router.use(authMiddleware);
router.get("/", getProjects);
router.post("/", roleMiddleware("admin"), createProjectValidator, validateRequest, createProject);
router.put("/:id", roleMiddleware("admin"), updateProjectValidator, validateRequest, updateProject);
router.delete("/:id", roleMiddleware("admin"), projectIdValidator, validateRequest, deleteProject);

module.exports = router;
