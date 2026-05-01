const { body, param } = require("express-validator");

const createTaskValidator = [
  body("title").trim().notEmpty().withMessage("Task title is required"),
  body("description").optional().isString(),
  body("assignedTo").isMongoId().withMessage("assignedTo must be a valid user id"),
  body("status").optional().isIn(["todo", "in_progress", "completed"]),
  body("dueDate").isISO8601().withMessage("dueDate must be a valid date"),
  body("projectId").isMongoId().withMessage("projectId must be a valid id"),
];

const updateTaskValidator = [
  param("id").isMongoId().withMessage("Invalid task id"),
  body("title").optional().isString(),
  body("description").optional().isString(),
  body("assignedTo").optional().isMongoId(),
  body("status").optional().isIn(["todo", "in_progress", "completed"]),
  body("dueDate").optional().isISO8601(),
];

const taskIdValidator = [param("id").isMongoId().withMessage("Invalid task id")];

module.exports = { createTaskValidator, updateTaskValidator, taskIdValidator };
