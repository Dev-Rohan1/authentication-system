// Import bcrypt for hashing passwords
import bcrypt from "bcrypt";
// Import the user model for database interaction
import userModel from "../models/userModel.js";

// Controller function to handle password reset
const resetPasswordController = async (req, res) => {
  // Extract email, otp, and newPassword from the request body
  const { email, otp, newPassword } = req.body;

  // Validate the email field
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  // Validate the OTP field
  if (!otp) {
    return res.json({ success: false, message: "OTP is required" });
  }

  // Validate the new password field
  if (!newPassword) {
    return res.json({ success: false, message: "New password is required" });
  }

  try {
    // Find the user by their email
    const user = await userModel.findOne({ email });

    // If the user does not exist, return an error response
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check if the OTP matches and is not empty
    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP!" });
    }

    // Check if the OTP has expired
    if (user.resetOtpExpAt < Date.now()) {
      return res.json({ success: false, message: "OTP has expired" });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the OTP fields
    user.password = hashedPassword; // Set the new hashed password
    user.resetOtp = ""; // Clear the OTP
    user.resetOtpExpAt = 0; // Reset the OTP expiration time

    // Save the updated user details
    await user.save();

    // Send a success response to the client
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    // Log the error and send a failure response
    res.json({ success: false, message: "Password reset failed!" });
  }
};

// Export the signup controller for use in other parts of the application.
export default resetPasswordController;
