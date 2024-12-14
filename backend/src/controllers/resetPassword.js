// Import bcrypt for password hashing
import bcrypt from "bcrypt";

// Import user model
import userModel from "../models/userModel.js";

const resetPassword = async (req, res) => {
  // Destructure user data from request body
  const { email, otp, newPassword } = req.body;

  // Validate required fields
  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: email, otp, and newPassword!",
    });
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Verify OTP
    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP!",
      });
    }

    // Check OTP expiry
    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired!",
      });
    }

    // Hash the new password securely
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and reset fields
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    // Save user data to database
    await user.save();

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Password reset successfully!",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({
      success: false,
      message: "Password reset failed!",
    });
  }
};

// Export the controller function
export default resetPassword;
