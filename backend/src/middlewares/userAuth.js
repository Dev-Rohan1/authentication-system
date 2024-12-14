// import jwt
import jwt from "jsonwebtoken"; // JWT token generation

const userAuth = (req, res, next) => {
  // Extract token from cookies
  const { token } = req.cookies;

  // Check for token presence
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Extract user ID from decoded token (if present)
    if (decodedToken.id) {
      req.body.userId = decodedToken.id; // Attach user ID to request body
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Proceed to next middleware or route handler (authorized access)
    next();
  } catch (error) {
    // Handle JWT verification errors
    console.error("Error verifying token:", error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

// Export the userAuth middleware
export default userAuth;
