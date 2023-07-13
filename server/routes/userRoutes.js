import express from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  updatePassword,
} from "../controllers/userController.js";
import { Auth } from "../helper/auth.js";
import { upload } from "../helper/helper.js";

const router = express.Router();

router
  .post("/register", upload.single("profileImage"), registerUser)
  .post("/login", loginUser)
  .post("/update-password", Auth.authorized, updatePassword)
  .post("/forgot-password", forgotPassword)
  .get("/reset-password", resetPassword);

export default router;
