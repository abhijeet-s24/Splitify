const { registerUser, loginUser } = require("../services/authService");

/**
 * POST /auth/register
 * Body: { name, email, password }
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const user = await registerUser({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: { user },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

/**
 * POST /auth/login
 * Body: { email, password }
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const { token, user } = await loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: { token, user },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

module.exports = { register, login };
