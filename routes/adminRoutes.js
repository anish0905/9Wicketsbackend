const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/admin", adminController.createAdmin);
router.get("/admins", adminController.getAdmins);

module.exports = router;
