const express = require("express");
const cors = require("cors");

// Route imports
const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/groupRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// ─── Global Middleware ───────────────────────────────────
app.use(cors());
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

// ─── Health Check ────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ success: true, message: "Splitwise Clone API is running 🚀" });
});

// ─── Routes ──────────────────────────────────────────────
app.use("/auth", authRoutes);
app.use("/groups", groupRoutes);
app.use("/expenses", expenseRoutes);

// ─── 404 Handler ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ─── Global Error Handler ────────────────────────────────
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`[Error ${statusCode}]:`, err.message);
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

module.exports = app;
