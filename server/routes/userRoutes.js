import express from "express";
import {
  loginUser,
  registerUser,
  updatePassword,
} from "../controllers/userController.js";
import { Auth } from "../helper/auth.js";
import { upload } from "../helper/helper.js";

const router = express.Router();

router
  .post("/register", upload.single("profileImage"), registerUser)
  .post("/login", loginUser)
  .post("/update-password", Auth.authorized, updatePassword);

export default router;
