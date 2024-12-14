// import user model and nodemailer
import userModel from "../models/userModel.js";
import transporter from "../utility/nodemailer.js";

const sendResetOtp = async (req, res) => {
  // Destructure email from the request body
  const { email } = req.body;

  // Validate required field
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Missing required field: email!",
    });
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Generate a 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Update user with reset OTP and expiry time (15 minutes)
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    // Create email options for password reset OTP
    const mailOptions = {
      from: "mdrohanulhaquerohan368@gmail.com", // Replace with a verified sender email
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your password reset OTP is: ${otp}. 
             Please enter this OTP to reset your password. 
             It will expire in 15 minutes.`,
    };

    // Send OTP email using the transporter
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending password reset OTP email:", error);
      } else {
        console.log(
          "Password reset OTP email sent successfully:",
          info.response
        );
      }
    });

    // Respond with success message (avoid sending OTP in response for security)
    res.json({
      success: true,
      message: "OTP sent successfully!",
    });
  } catch (error) {
    console.error("Error sending password reset OTP:", error);
    res.status(500).json({
      success: false,
      message: "OTP sending failed!",
    });
  }
};

// Export the sendResetOtp function
export default sendResetOtp;
