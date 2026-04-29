const crypto = require("crypto");

/**
 * Generates a random 6-character uppercase alphanumeric invite code.
 * e.g. "A3X9KP"
 */
const generateInviteCode = () => {
  return crypto.randomBytes(3).toString("hex").toUpperCase(); // 3 bytes → 6 hex chars
};

module.exports = generateInviteCode;
