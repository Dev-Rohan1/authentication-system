// Importing the userModel from the models directory
import userModel from "../models/userModel.js";

// Defining an asynchronous controller function to handle user data retrieval
const getUserController = async (req, res) => {
  // Destructuring the userId from the request body
  const { userId } = req.body;

  try {
    // Fetching the user document from the database by its ID
    const user = await userModel.findById(userId);

    // Checking if the user exists
    if (!user) {
      // If user is not found, send a response indicating failure
      return res.json({ success: false, message: "User not found" });
    }

    // If user is found, send a success response with user details
    res.json({
      success: true,
      name: user.name, // User's name
      email: user.email, // User's email
      isAccountVerified: user.isAccountVerified, // Status of account verification
    });
  } catch (error) {
    // Handling any errors during the database operation
    return res.json({ success: false, message: "User not found" });
  }
};

// Exporting the getUserController function as the default export
export default getUserController;
