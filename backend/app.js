// Import external packages
import express from "express"; // Framework for building web applications and APIs.
import mongoose from "mongoose"; // ODM (Object Data Modeling) library for MongoDB and Node.js.
import bodyParser from "body-parser"; // Middleware for parsing incoming JSON request bodies.
import cookieParser from "cookie-parser"; // Middleware for parsing cookies from incoming requests.
import dotenv from "dotenv"; // Library to load environment variables from a .env file into process.env.
import cors from "cors"; // Middleware to enable Cross-Origin Resource Sharing (CORS).

// Import internal modules and functions
import router from "./src/routes/api.js"; // Routes defined in the 'api.js' file.

// Initialize the Express application
const app = express(); // Creates an instance of the Express application.

// Load environment variables from .env file
dotenv.config(); // Makes environment variables accessible via process.env.

// Middleware configuration
app.use(cors({ credentials: true })); // Enables CORS with support for credentials.
app.use(bodyParser.json()); // Parses incoming JSON request payloads.
app.use(cookieParser()); // Parses cookies from incoming requests.

// Database connection
mongoose
  .connect(`${process.env.DATABASE_CONNECTION_URL}/auth-users`) // Connects to the MongoDB database using the connection URL and database name.
  .then(() => console.log("Database connection successful")) // Logs a success message upon successful connection.
  .catch((err) => console.log(err)); // Logs an error message if the connection fails.

// Routes configuration
app.use("/api/auth", router); // Sets up routes for the API under the '/api/auth' endpoint.

// Fallback route for unmatched requests
app.use("*", (req, res) => {
  res.status(404).json({ message: "Url Not found" }); // Returns a 404 response for undefined routes.
});

// Start the server and listen on the specified port
const PORT = process.env.SERVER_RUNNING_PORT || 5050; // Sets the server port from environment variables or defaults to 5050.
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Starts the server and logs the port number.
