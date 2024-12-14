// Import external packages
import bcrypt from "bcrypt"; // Password hashing
import jwt from "jsonwebtoken"; // JWT token generation

// Import internal modules
import userModel from "../models/userModel.js";
import transporter from "../utility/nodemailer.js"; // Email transporter

const signup = async (req, res) => {
  // Destructure user data (cleaner syntax)
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: name, email, and password!",
    });
  }

  try {
    // Check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists!",
      });
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const user = new userModel({ name, email, password: hashedPassword });

    // Save user to database
    await user.save();

    // Generate JWT token with user ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    // Set secure cookie (adjust settings as needed)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Create email options for welcome message
    const mailOptions = {
      from: "mdrohanulhaquerohan368@gmail.com", // Replace with a verified sender email
      to: email,
      subject: "Welcome to our MERN Auth App",
      text: `Hello ${user.name},\n\nWelcome to our MERN Auth App! We're excited to have you join our community.\n\nBest,\nYour MERN Auth Team`,
    };

    // Send welcome email using the transporter
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Welcome email sent failed");
      } else {
        console.log("Welcome email sent successful...");
      }
    });

    // Respond with success message
    res.status(201).json({ success: true, message: "Signup successful!" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ success: false, message: "Signup failed!" }); // Use specific status code
  }
};

export default signup;
