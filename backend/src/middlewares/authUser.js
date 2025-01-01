// Import the jwt library for verifying JSON Web Tokens (JWT)
import jwt from "jsonwebtoken";

// Middleware function to authenticate the user
const authUser = (req, res, next) => {
  const { token } = req.cookies; // Extract the JWT token from cookies.

  // Check if the token is present in the request
  if (!token) {
    return res.json({
      success: false, // Indicate failure
      message: "Unauthorized! please try again.", // Inform the user about missing token
    });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the token contains the user ID
    if (!decoded.id) {
      return res.json({
        success: false, // Indicate failure
        message: "Unauthorized! please try again.", // Inform the user about invalid token
      });
    }

    // Attach the user ID from the decoded token to the request body
    req.body.userId = decoded.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors that occur during token verification
    res.json({
      success: false, // Indicate failure
      message: "Unauthorized! please try again.", // Inform the user about token verification failure
    });
  }
};

// Export the middleware for use in other parts of the application.
export default authUser;
