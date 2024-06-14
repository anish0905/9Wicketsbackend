const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");

const agentRoutes = require("./routes/agentRoutes");
const cors = require("cors");

const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
// Home route for admin routes
app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.use("/api", adminRoutes);
app.use("/api/agents", agentRoutes);

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
