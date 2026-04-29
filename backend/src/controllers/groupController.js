const Group = require("../models/Group");
const GroupMember = require("../models/GroupMember");
const Expense = require("../models/Expense");
const { getGroupWithMembershipCheck } = require("../services/groupService");
const { computeSettlements } = require("../services/settlementService");
const generateInviteCode = require("../utils/generateInviteCode");

/**
 * POST /groups
 * Create a new group and auto‑add the creator as admin.
 */
const createGroup = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Group name is required." });
    }

    // Generate a unique invite code
    let inviteCode = generateInviteCode();
    while (await Group.findOne({ inviteCode })) {
      inviteCode = generateInviteCode();
    }

    const group = await Group.create({ name, inviteCode, createdBy: userId });

    // Auto‑add creator as admin
    await GroupMember.create({
      group: group._id,
      user: userId,
      role: "admin",
    });

    return res.status(201).json({ success: true, data: group });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /groups
 * List all groups the authenticated user belongs to.
 */
const getUserGroups = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const memberships = await GroupMember.find({ user: userId }).populate("group");
    const groups = memberships
      .map((m) => m.group)
      .filter(Boolean);

    return res.status(200).json({ success: true, data: groups });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /groups/join
 * Body: { inviteCode }
 */
const joinGroup = async (req, res, next) => {
  try {
    const { inviteCode } = req.body;
    const userId = req.user.userId;

    if (!inviteCode) {
      return res
        .status(400)
        .json({ success: false, message: "inviteCode is required." });
    }

    const group = await Group.findOne({
      inviteCode: inviteCode.trim().toUpperCase(),
    });

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid invite code." });
    }

    // Check if already a member
    const existing = await GroupMember.findOne({
      group: group._id,
      user: userId,
    });

    if (existing) {
      return res
        .status(200)
        .json({ success: true, message: "Already a member.", data: group });
    }

    await GroupMember.create({ group: group._id, user: userId, role: "member" });

    return res
      .status(200)
      .json({ success: true, message: "Joined group successfully.", data: group });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /groups/:groupId
 * Return group details (membership check applied).
 */

const getGroupDetails = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.userId;

    const group = await getGroupWithMembershipCheck(groupId, userId);

    const [memberCount, expenseCount] = await Promise.all([
      GroupMember.countDocuments({ group: group._id }),
      Expense.countDocuments({ group: group._id }),
    ]);

    return res.status(200).json({
      success: true,
      data: { group, memberCount, expenseCount },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /groups/:groupId/members
 */
const getGroupMembers = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.userId;

    await getGroupWithMembershipCheck(groupId, userId);

    const members = await GroupMember.find({ group: groupId }).populate(
      "user",
      "name email"
    );

    const data = members.map((m) => ({
      userId: m.user._id,
      name: m.user.name,
      email: m.user.email,
      role: m.role,
      joinedAt: m.createdAt,
    }));

    return res.status(200).json({ success: true, data });
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

    await getGroupWithMembershipCheck(groupId, userId);

    const expenses = await Expense.find({ group: groupId })
      .populate("paidBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /groups/:groupId/settlements
 * Computes net balances + minimal greedy transactions — nothing stored.
 */
const getGroupSettlements = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.userId;

    await getGroupWithMembershipCheck(groupId, userId);

    const { balances, settlements, totalExpenses } =
      await computeSettlements(groupId);

    return res.status(200).json({
      success: true,
      data: { groupId, totalExpenses, balances, settlements },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGroup,
  getUserGroups,
  joinGroup,
  getGroupDetails,
  getGroupMembers,
  getGroupExpenses,
  getGroupSettlements,
};
