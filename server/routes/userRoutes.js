import express from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  updatePassword,
} from "../controllers/userController.js";
import { Auth } from "../helper/auth.js";
import { profileImageUpload } from "../helper/helper.js";

const router = express.Router();

router
  .post("/register", profileImageUpload.single("profileImage"), registerUser)
  .post("/login", loginUser)
  .post("/update-password", Auth.authorized, updatePassword)
  .post("/forgot-password", forgotPassword)
  .get("/reset-password", resetPassword)
  .post("/refresh-token", refreshToken);

export default router;
