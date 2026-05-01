const express = require("express");
const { getUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authMiddleware, roleMiddleware("admin"));
router.get("/", getUsers);

module.exports = router;
