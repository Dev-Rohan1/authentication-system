const logout = async (req, res) => {
  try {
    // Clear the 'token' cookie from the client-side
    res.clearCookie("token", {
      httpOnly: true, // Only accessible via HTTP, not JavaScript
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Configure sameSite attribute based on environment
    });

    // Send success response to the client
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    // Handle potential errors during logout (e.g., cookie clearing issues)
    console.error("Logout failed:", error);
    res.status(500).json({ success: false, message: "Logout failed!" });
  }
};

// Export logout controller function
export default logout;
