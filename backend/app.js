// Import external packages
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Import internal modules
import router from "./src/routes/api.js";

// Initialize Express app
dotenv.config();
const app = express();

// Middleware configuration
app.use(
  cors({
    origin: ["https://authentication-system-sepia.vercel.app/"], // Set your frontend URL explicitly
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json()); // Replaces body-parser
app.use(cookieParser());

// Database connection
const DATABASE_URL = process.env.DATABASE_CONNECTION_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_CONNECTION_URL is missing in environment variables.");
  process.exit(1); // Stop the app if DB URL is missing
}

mongoose
  .connect(`${DATABASE_URL}/auth-users`)
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Exit if DB connection fails
  });

// Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/auth", router);

// Handle 404 errors
app.use("*", (req, res) => {
  res.status(404).json({ message: "URL not found" });
});

// Start server
const PORT = process.env.SERVER_RUNNING_PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
