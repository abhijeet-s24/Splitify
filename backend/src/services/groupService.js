const mongoose = require("mongoose");
const Group = require("../models/Group");
const GroupMember = require("../models/GroupMember");

/**
 * Verifies that a user is a member of the group.
 * Throws a 4xx error if not.
 */
const ensureGroupMembership = async (groupId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    const error = new Error("Invalid group ID.");
    error.statusCode = 400;
    throw error;
  }

  // GroupMember schema uses group and user field names
  const membership = await GroupMember.findOne({ group: groupId, user: userId });

  if (!membership) {
    const error = new Error("You are not a member of this group.");
    error.statusCode = 403;
    throw error;
  }

  return membership;
};

/**
 * Fetches the group after verifying membership.
 * Populates createdBy with name + email.
 */
const getGroupWithMembershipCheck = async (groupId, userId) => {
  await ensureGroupMembership(groupId, userId);

  const group = await Group.findById(groupId).populate("createdBy", "name email");

  if (!group) {
    const error = new Error("Group not found.");
    error.statusCode = 404;
    throw error;
  }

  return group;
};

module.exports = { ensureGroupMembership, getGroupWithMembershipCheck };
