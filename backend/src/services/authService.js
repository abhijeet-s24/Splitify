const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SALT_ROUNDS = 10;

/**
 * Register a new user.
 * Hashes the password and saves to DB.
 * Returns the created user (without password).
 */
const registerUser = async ({ name, email, password }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("User with this email already exists.");
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Return user object without password
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

/**
 * Login user.
 * Verifies credentials and returns a JWT token.
 */
const loginUser = async ({ email, password }) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  // Generate JWT
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  // Return token and user info (without password)
  const userObj = user.toObject();
  delete userObj.password;

  return { token, user: userObj };
};

module.exports = { registerUser, loginUser };
