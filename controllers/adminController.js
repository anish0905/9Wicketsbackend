const Admin = require("../models/admin.js");
const bcrypt = require("bcryptjs");

exports.createAdmin = async (req, res) => {
  try {
    const { adminName, adminEmail, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ adminEmail });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists." });
    }

    const newAdmin = new Admin({
      adminName,
      adminEmail,
      password,
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
