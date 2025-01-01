// import the user model to interact with the database
import userModel from "../models/userModel.js";

// Controller function to verify email based on userId and OTP
const verifyEmail = async (req, res) => {
  // Extract userId and otp from the request body
  const { userId, otp } = req.body;

  // Check if userId is provided
  if (!userId) {
    return res.json({ message: "User not found!" });
  }

  // Check if OTP is provided
  if (!otp) {
    return res.json({ message: "OTP is required" });
  }

  try {
    // Find the user by their ID
    const user = await userModel.findById(userId);

    // If user does not exist, return a relevant message
    if (!user) {
      return res.json({ message: "User not found!" });
    }

    // Check if the OTP matches and is not empty
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ message: "Invalid OTP!" });
    }

    // Check if the OTP has expired
    if (user.verifyOtpExpAt < Date.now()) {
      return res.json({ message: "OTP has expired!" });
    }

    // Update the user's verification status
    user.isAccountVerified = true; // Set the account as verified
    user.verifyOtp = ""; // Clear the OTP
    user.verifyOtpExpAt = 0; // Reset the OTP expiration time

    // Save the updated user details
    await user.save();

    // Send a success response to the client
    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    // Send a failure response in case of an error
    res.json({ success: false, message: "Email verification failed!" });
  }
};

// Export the function for use in other parts of the application.
export default verifyEmail;
