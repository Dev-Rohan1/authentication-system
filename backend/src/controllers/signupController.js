// Import external packages
import bcrypt from "bcrypt"; // Library for hashing passwords.
import jwt from "jsonwebtoken"; // Library for creating and verifying JSON Web Tokens.

// Import internal modules and functions
import userModel from "../models/userModel.js"; // Import the user model for interacting with the database.
import transporter from "../utility/nodeMailer.js"; // Import the transporter for sending emails.

// Controller function for user signup
const signupController = async (req, res) => {
  const { name, email, password } = req.body; // Extracting the required fields from the request body.

  // Validate input fields
  if (!name) {
    return res
      .status(400) // HTTP 400 Bad Request for missing input.
      .json({ success: false, message: "Name is required" });
  }

  if (!email) {
    return res
      .status(400) // HTTP 400 Bad Request for missing input.
      .json({ success: false, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400) // HTTP 400 Bad Request for missing input.
      .json({ success: false, message: "Password is required" });
  }

  try {
    // Check if the user already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409) // HTTP 409 Conflict for duplicate resources.
        .json({ success: false, message: "User already exists" });
    }

    // Hash the user's password securely
    const SALT_ROUNDS = 10; // Use a salt round value of 10 for hashing.
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user instance with the hashed password
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await user.save();

    // Generate a JSON Web Token (JWT) for the new user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h", // Token validity period of 24 hours.
    });

    // Set the JWT as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent access to the cookie via client-side scripts.
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production.
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // SameSite policy based on the environment.
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (24 hours).
    });

    // Prepare the email options
    const mailOptions = {
      from: "mdrohanulhaquerohan368@gmail.com", // Sender email address
      to: email, // List of receivers
      subject: "Welcome to our platform", // Email subject
      text: `Hello ${name}, 

      Welcome to MERN Auth

      We are thrilled to have you join our community. Whether you're here to explore, learn, or connect, we’re committed to providing you with the best experience possible. If you have any questions or need assistance, our support team is here to help at [Support Email].
      
      Let’s get started on this exciting journey together!
      
      Best regards,  
      The MERN Auth Team`, // Email body text
    };

    // Send the welcome email to the new user
    await transporter.sendMail(mailOptions);

    // Respond with a success message and the generated token
    res
      .status(201) // HTTP 201 Created for successful resource creation.
      .json({ success: true, message: "Signup successful" });
  } catch (error) {
    // Handle any unexpected errors during the signup process
    res
      .status(500) // HTTP 500 Internal Server Error for unexpected errors.
      .json({ success: false, message: "Signup failed!" });
  }
};

// Export the signup controller for use in other parts of the application.
export default signupController;
