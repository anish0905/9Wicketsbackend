const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");

// Signup route
router.post("/signup", agentController.signup);

// Login route
router.post("/login", agentController.login);

// Logout route
router.post("/logout", agentController.logout);

module.exports = router;
