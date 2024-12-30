// import express package
import express from "express";

// import inreranl modules functions
import signupController from "../controllers/signupController.js";

// create a router object
const router = express.Router();

router.post("/signup", signupController);

export default router;
