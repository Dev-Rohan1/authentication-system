import userModel from "../models/userModel.js"; // Import the user model
import transporter from "../utility/nodeMailer.js"; // Import the configured Nodemailer transporter

// Controller function to send a reset OTP to the user's email
const sendResetOtp = async (req, res) => {
  // Extract the email from the request body
  const { email } = req.body;

  // Validate the email field
  if (!email) {
    return res.json({ message: "Email is required" });
  }

  try {
    // Find the user by their email address
    const user = await userModel.findOne({ email });

    // If the user does not exist, return an error response
    if (!user) {
      return res.json({ message: "User not found" });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save the OTP and its expiration time (24 hours from now) in the user document
    user.resetOtp = otp;
    user.resetOtpExpAt = Date.now() + 24 * 60 * 60 * 1000; // Expiration set to 24 hours

    // Save the updated user details
    await user.save();

    // Prepare the email options
    const mailOptions = {
      from: "mdrohanulhaquerohan368@gmail.com", // Sender email address
      to: email, // Recipient email address
      subject: "Reset password OTP", // Email subject
      text: `Your reset password OTP is: ${otp}`, // Email body containing the OTP
    };

    // Send the OTP email to the user
    await transporter.sendMail(mailOptions);

    // Send a success response to the client
    res.json({
      success: true,
      message: "Reset password OTP sent successfully",
    });
  } catch (error) {
    // Log any errors for debugging
    console.log(error);

    // Send a failure response in case of an error
    res.json({ success: false, message: "Reset password OTP sent failed!" });
  }
};

// Export the function for use in other parts of the application
export default sendResetOtp;
