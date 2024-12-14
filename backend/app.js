// imports external packages
import express from "express"; // For creating the Express.js server
import mongoose from "mongoose"; // For interacting with MongoDB
import cors from "cors"; // For enabling Cross-Origin Resource Sharing (CORS)
import bodyParser from "body-parser"; // For parsing request bodies (e.g., JSON)
import cookieParser from "cookie-parser"; // For parsing cookies from requests
import dotenv from "dotenv"; // For loading environment variables from a .env file

// imports internal files
import router from "./src/routes/api.js"; // Import the API routes

// express app initialization
const app = express();

// dotenv configuration
dotenv.config(); // Load environment variables from .env file

// middlewares
app.use(cors({ credentials: true })); // Enable CORS with credential support
app.use(bodyParser.json()); // Parse incoming JSON request bodies
app.use(cookieParser()); // Parse cookies from incoming requests

// database connection
mongoose
  .connect(process.env.DTABASE_CONNECTION_URL) // Connect to MongoDB using the connection URL from the environment
  .then(() => console.log("database connection successful...."))
  .catch((err) => console.log(err));

// routes
app.use("/auth", router); // Mount the API routes under the "/auth" path

// not found route
app.use("*", (req, res) => {
  res
    .status(404)
    .json({ success: false, error: "your requested url was not found!" });
});

// server listening on port
const port = process.env.SERVER_RUNNING_PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
