const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createGroup,
  getUserGroups,
  joinGroup,
  getGroupDetails,
  getGroupMembers,
  getGroupExpenses,
  getGroupSettlements,
} = require("../controllers/groupController");

// All group routes require authentication
router.use(authMiddleware);

// POST /groups             — create a new group
// TODO: Need to add validation for the group name and invite code
router.post("/", createGroup);

// GET  /groups             — list user's groups
router.get("/", getUserGroups);

// POST /groups/join        — join via invite code
router.post("/join", joinGroup);

// GET  /groups/:groupId           — group details
router.get("/:groupId", getGroupDetails);

// GET  /groups/:groupId/members   — list members
router.get("/:groupId/members", getGroupMembers);

// GET  /groups/:groupId/expenses  — list expenses
router.get("/:groupId/expenses", getGroupExpenses);

// GET  /groups/:groupId/settlements — compute settlements dynamically
router.get("/:groupId/settlements", getGroupSettlements);

module.exports = router;
