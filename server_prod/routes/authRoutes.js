import express from "express";
import * as authController from "../controllers/authControllers.js";

const router = express.Router();

router
  .post("/signup", authController.userSignUp)
  .post("/login", authController.userLogIn)
  .post("/update-password", authMiddleware, authController.updatePassword);

export default router;
