// import mongoose
import mongoose from "mongoose";

// Define the schema for a user document in MongoDB
const userSchema = mongoose.Schema({
  name: { type: String, required: true }, // User's full name (required)
  email: { type: String, required: true, unique: true }, // User's email address (required and unique)
  password: { type: String, required: true }, // User's password (required)
  verifyOtp: { type: String, default: "" }, // Verification OTP for email verification
  verifyOtpExpireAt: { type: Number, default: 0 }, // Timestamp when the verification OTP expires
  isVerifiedAccount: { type: Boolean, default: false }, // Indicates whether the user's account is verified
  resetOtp: { type: String, default: "" }, // Reset password OTP
  resetOtpExpireAt: { type: Number, default: 0 }, // Timestamp when the reset password OTP expires
});

// Create a Mongoose model based on the userSchema
const userModel = mongoose.model("user", userSchema);

export default userModel; // Export the userModel for use in other parts of the application
