// import internal modules functions
import userModel from "../models/userModel.js";
import transporter from "../utility/nodemailer.js";

const sendVerifyOtp = async (req, res) => {
  // Destructure user ID from request body
  const { userId } = req.body;

  try {
    // Find user by ID
    const user = await userModel.findById(userId);

    // Check if user is already verified
    if (user.isVerifiedAccount) {
      return res.json({ success: false, message: "User is already verified!" });
    }

    // Generate a 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Update user with OTP and expiry time
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    await user.save();

    // Create email options for OTP message
    const mailOptions = {
      from: "mdrohanulhaquerohan368@gmail.com", // Replace with a verified sender email
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your account verification OTP is: ${otp}. Please enter this OTP to verify your account. It will expire in 24 hours.`,
    };

    // Send OTP email using the transporter
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Verification OTP email sending failed:", error);
      } else {
        console.log("Verification OTP email sent successfully:", info.response);
      }
    });

    // Respond with success message
    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.json({ success: false, message: "OTP sending failed!" });
  }
};

// Export the controller function
export default sendVerifyOtp;
