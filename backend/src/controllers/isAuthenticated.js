// Controller function to check if the user is authenticated
const isAuthenticated = (req, res) => {
  try {
    // Respond with a success message indicating the user is authenticated
    res.json({ success: true, message: "User is authenticated" });
  } catch (error) {
    // If an error occurs, respond with a failure message
    res.json({ success: false, message: "User not authenticated" });
  }
};

export default isAuthenticated;
