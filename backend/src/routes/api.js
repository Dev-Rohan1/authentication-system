// import express and internal modules functions
import express from "express";
import signup from "../controllers/signup.js";
import login from "../controllers/login.js";
import logout from "../controllers/logout.js";
import sendVerifyOtp from "../controllers/sendVerifyOtp.js";
import userAuth from "../middlewares/userAuth.js";
import emailVerify from "../controllers/emailVerify.js";
import isAuthenticated from "../controllers/isAuthenticated.js";
import sendResetOtp from "../controllers/sendResetOtp.js";
import resetPassword from "../controllers/resetPassword.js";
import getUserData from "../controllers/getUserData.js";

// Create a new Express router
const router = express.Router();

// User Management Routes
router.post("/signup", signup); // Create a new user account
router.post("/login", login); // Login user and generate JWT token
router.post("/logout", logout); // Logout user and clear cookie
router.post("/send-verify-otp", userAuth, sendVerifyOtp); // Send verification OTP via email
router.post("/verify-account", userAuth, emailVerify); // Verify account using OTP

// Protected Routes (require user authentication)
router.get("/get-user", userAuth, getUserData); // Get user data (requires authentication)
router.post("/is-auth", userAuth, isAuthenticated); // Check if user is authenticated

// Password Reset Routes
router.post("/send-reset-otp", sendResetOtp); // Send password reset OTP
router.post("/reset-password", resetPassword); // Reset password using OTP

// Export the router
export default router;
