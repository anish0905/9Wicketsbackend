const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Agent = require("../models/agent");

// JWT secret key
const JWT_SECRET = "your_jwt_secret_key"; // Replace with a strong secret key

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if user already exists
    const existingAgent = await Agent.findOne({ userName });
    if (existingAgent) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new agent
    const newAgent = new Agent({
      userName,
      password,
    });

    await newAgent.save();

    // Generate JWT token
    const token = jwt.sign({ id: newAgent._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login controller

exports.login = async (req, res) => {
  try {
    const { username, password, validationCode } = req.body;

    // Find agent by userName
    const agent = await Agent.findOne({
      userName: username,
    });

    console.log(agent);
    if (!agent) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: agent._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Logout controller
exports.logout = (req, res) => {
  res.status(200).json({ token: null, message: "Logout successful" });
};
