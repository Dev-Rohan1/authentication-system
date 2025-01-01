// Import external packages
import bcrypt from "bcrypt"; // Library for comparing hashed passwords.
import jwt from "jsonwebtoken"; // Library for creating and verifying JSON Web Tokens.

// Import internal modules and functions
import userModel from "../models/userModel.js"; // Import the user model for interacting with the database.

// Controller function for user login
const loginController = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body.

  // Validate input fields
  if (!email) {
    return res
      .status(400) // HTTP 400 Bad Request for missing email.
      .json({ success: false, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400) // HTTP 400 Bad Request for missing password.
      .json({ success: false, message: "Password is required" });
  }

  try {
    // Find the user in the database by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404) // HTTP 404 Not Found if user doesn't exist.
        .json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401) // HTTP 401 Unauthorized for invalid password.
        .json({ success: false, message: "Wrong password" });
    }

    // Generate a JSON Web Token (JWT) for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h", // Token validity period of 24 hours.
    });

    // Set the JWT as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent access to the cookie via client-side scripts.
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production.
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // SameSite policy based on the environment.
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (24 hours).
    });

    // Respond with a success message
    res
      .status(200) // HTTP 200 OK for successful login.
      .json({ success: true, message: "Login successful" });
  } catch (error) {
    // Respond with an error message
    res
      .status(500) // HTTP 500 Internal Server Error for unexpected issues.
      .json({ success: false, message: "Login failed!" });
  }
};

// Export the login controller for use in other parts of the application.
export default loginController;
