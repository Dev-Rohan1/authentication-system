// Import external packages
import jwt from "jsonwebtoken"; // JWT token generation
import bcrypt from "bcrypt"; // Password hashing

// Import user model
import userModel from "../models/userModel.js";

const login = async (req, res) => {
  // Destructure user credentials from request body
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: email and password!",
    });
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email!", // More secure message
      });
    }

    // Compare hashed password with provided password
    const isValidPassword = await bcrypt.compare(password, user.password);

    // Check password validity
    if (!isValidPassword) {
      return res.status(401).json({
        // Use specific status code for unauthorized access
        success: false,
        message: "password is incorrect!", // More secure message
      });
    }

    // Generate JWT token with user ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    // Set secure cookie (adjust settings as needed)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Respond with success message (optional user data)
    res.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ success: false, message: "Login failed!" });
  }
};

// Export login controller function
export default login;
