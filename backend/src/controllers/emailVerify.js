// Import internal modules function
import userModel from "../models/userModel.js";

const emailVerify = async (req, res) => {
  // Destructure user ID and OTP from request body
  const { userId, otp } = req.body;

  console.log(otp);

  // Validate required fields
  if (!userId || !otp) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: userId and otp!",
    });
  }

  try {
    // Find user by ID
    const user = await userModel.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Verify OTP
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP!",
      });
    }

    // Check OTP expiry
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired!",
      });
    }

    // Mark user account as verified
    user.isVerifiedAccount = true;
    user.verifyOtp = ""; // Clear OTP field
    user.verifyOtpExpireAt = 0; // Reset expiry time
    await user.save();

    // Respond with success message
    res.json({ success: true, message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({
      success: false,
      message: "Email verification failed!",
    });
  }
};

// Export the controller function
export default emailVerify;
