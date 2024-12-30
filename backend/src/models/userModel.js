// Import mongoose package
import mongoose from "mongoose"; // MongoDB ODM library for schema-based interaction with the database.

// Define the user schema
const userSchema = mongoose.Schema({
  name: {
    type: String, // The name of the user, stored as a string.
    required: true, // This field is mandatory.
  },
  email: {
    type: String, // The user's email address, stored as a string.
    required: true, // This field is mandatory.
    unique: true, // Ensures that the email is unique across all users in the collection.
  },
  password: {
    type: String, // The user's password, stored as a string (should be hashed for security).
    required: true, // This field is mandatory.
  },
  verifyOtp: {
    type: String, // Stores the OTP (One-Time Password) for email verification.
    default: "", // Default value is an empty string if not provided.
  },
  verifyOtpExpAt: {
    type: Number, // Stores the expiration timestamp for the email verification OTP.
    default: 0, // Default value is 0 if not provided.
  },
  isAccountVerified: {
    type: Boolean, // Indicates whether the user's account has been verified.
    default: false, // Default value is `false` until verification is complete.
  },
  resetOtp: {
    type: String, // Stores the OTP for resetting the user's password.
    default: "", // Default value is an empty string if not provided.
  },
  resetOtpExpAt: {
    type: Number, // Stores the expiration timestamp for the reset OTP.
    default: 0, // Default value is 0 if not provided.
  },
});

// Create the user model
const userModel = mongoose.model("Users", userSchema);
// Creates a Mongoose model named "Users" based on the `userSchema` definition.
// This model represents the "Users" collection in the database.

// Export the user model
export default userModel;
// Makes the model available for import in other parts of the application.
