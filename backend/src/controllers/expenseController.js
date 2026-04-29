const Expense = require("../models/Expense");
const GroupMember = require("../models/GroupMember");
const { ensureGroupMembership } = require("../services/groupService");

/**
 * POST /expenses
 * Body: { groupId, amount, description }
 * paidBy = authenticated user
 */
const createExpense = async (req, res, next) => {
  try {
    const { groupId, amount, description } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!groupId || !amount || !description) {
      return res.status(400).json({
        success: false,
        message: "groupId, amount, and description are required.",
      });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive number.",
      });
    }

    // Only group members can add expenses
    await ensureGroupMembership(groupId, userId);

    // Store raw expense — no splits stored
    const expense = await Expense.create({
      group: groupId,
      paidBy: userId,
      amount,
      description,
    });

    await expense.populate("paidBy", "name email");

    return res.status(201).json({ success: true, data: expense });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /groups/:groupId/expenses
 */
const getGroupExpenses = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.userId;

    // Only group members can view expenses
    await ensureGroupMembership(groupId, userId);

    const expenses = await Expense.find({ group: groupId })
      .populate("paidBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    next(error);
  }
};

module.exports = { createExpense, getGroupExpenses };
