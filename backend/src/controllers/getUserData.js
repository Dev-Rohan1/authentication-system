// Import user model
import userModel from "../models/userModel.js";

const getUserData = async (req, res) => {
  // Destructure user ID from request body (assuming it's already validated by middleware)
  const { userId } = req.body;

  try {
    // Find user by ID
    const user = await userModel.findById(userId);

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // Prepare user data for response (excluding sensitive information)
    const userData = {
      name: user.name,
      email: user.email,
      isVerifiedAccount: user.isVerifiedAccount,
    };

    // Respond with success and user data
    return res.status(200).json({ success: true, userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// Export the getUserData function
export default getUserData;
