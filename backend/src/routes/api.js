// Import the express package for creating the router
import express from "express";

// Import internal module functions (controllers and middleware)
import getUserController from "../controllers/getUserController.js"; // Handles fetching user details
import isAuthenticated from "../controllers/isAuthenticated.js"; // Checks if a user is authenticated
import loginController from "../controllers/loginController.js"; // Handles user login
import logOutController from "../controllers/logoutController.js"; // Handles user logout
import resetPasswordController from "../controllers/resetPasswordController.js"; // Handles password reset
import sendResetOtp from "../controllers/sendResetOtp.js"; // Sends OTP for password reset
import sendVerifyOtp from "../controllers/sendVerifyOtp.js"; // Sends OTP for email verification
import signupController from "../controllers/signupController.js"; // Handles user signup
import verifyEmail from "../controllers/verifyEmail.js"; // Verifies user email
import authUser from "../middlewares/authUser.js"; // Middleware for authentication verification

// Create a router object using express
const router = express.Router();

// Route to handle user signup
router.post("/signup", signupController);

// Route to handle user login
router.post("/login", loginController);

// Route to handle user logout
router.post("/logout", logOutController);

// Route to send OTP for email verification (requires authentication)
router.post("/send-verify-otp", authUser, sendVerifyOtp);

// Route to verify user email (requires authentication)
router.post("/verify-email", authUser, verifyEmail);

// Route to check if a user is authenticated (requires authentication)
router.get("/is-auth", authUser, isAuthenticated);

// Route to send OTP for password reset
router.post("/send-reset-otp", sendResetOtp);

// Route to handle password reset
router.post("/reset-password", resetPasswordController);

// Route to fetch user details (requires authentication)
router.get("/get-user", authUser, getUserController);

// Export the router object for use in other parts of the application
export default router;
