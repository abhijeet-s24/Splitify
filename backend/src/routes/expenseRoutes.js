const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createExpense, getGroupExpenses } = require("../controllers/expenseController");

// All expense routes require authentication
router.use(authMiddleware);

// POST /expenses — create an expense
router.post("/", createExpense);

module.exports = router;
