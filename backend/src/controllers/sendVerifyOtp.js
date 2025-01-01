// Import internal modules functions
import userModel from "../models/userModel.js"; // User model for database interaction.
import transporter from "../utility/nodeMailer.js"; // Nodemailer transporter for sending emails.

// Controller function to send verification OTP
const sendVerifyOtp = async (req, res) => {
  const { userId } = req.body; // Extract userId from the request body.

  try {
    // Check if the user exists in the database
    const user = await userModel.findById(userId);

    // Verify if the user's account is already verified
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" }); // If verified, return an appropriate message.
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Assign OTP and expiry time to the user object
    user.verifyOtp = otp; // Save the OTP for verification later.
    user.verifyOtpExpAt = Date.now() + 24 * 60 * 60 * 1000; // Set OTP expiry time to 24 hours from now.

    // Save the updated user information to the database
    await user.save();

    // Prepare email options for sending the OTP
    const mailOptions = {
      from: "mdrohanulhaquerohan368@gmail.com", // Sender's email address.
      to: user.email, // Recipient's email address (user's email).
      subject: "Account Verification OTP", // Subject line of the email.
      text: `Your Account Verification OTP is: ${otp}`, // Email body containing the OTP.
    };

    // Send the email with the OTP
    await transporter.sendMail(mailOptions);

    // Respond with a success message
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// Export the function for use in other parts of the application.
export default sendVerifyOtp;
