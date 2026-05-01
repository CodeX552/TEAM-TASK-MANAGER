const { body, param } = require("express-validator");

const createProjectValidator = [
  body("name").trim().notEmpty().withMessage("Project name is required"),
  body("description").optional().isString(),
  body("members").optional().isArray().withMessage("Members must be an array"),
];

const updateProjectValidator = [
  param("id").isMongoId().withMessage("Invalid project id"),
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("members").optional().isArray(),
];

const projectIdValidator = [param("id").isMongoId().withMessage("Invalid project id")];

module.exports = { createProjectValidator, updateProjectValidator, projectIdValidator };
