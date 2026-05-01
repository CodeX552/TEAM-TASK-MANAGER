const express = require("express");
const { signup, login } = require("../controllers/authController");
const { signupValidator, loginValidator } = require("../validators/authValidators");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

router.post("/signup", signupValidator, validateRequest, signup);
router.post("/login", loginValidator, validateRequest, login);

module.exports = router;
