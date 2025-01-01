// Controller function for logging out a user
const logOutController = (req, res) => {
  try {
    // Clear the "token" cookie to log the user out
    res.clearCookie("token");

    // Respond with a success message
    res
      .status(200) // HTTP 200 OK for successful logout.
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Logout Error:", error);

    // Respond with an error message
    res
      .status(500) // HTTP 500 Internal Server Error for unexpected issues.
      .json({ success: false, message: "Logout failed!" });
  }
};

// Export the logout controller for use in other parts of the application.
export default logOutController;
