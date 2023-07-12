import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { upload } from "../helper/helper.js";
import { registerValidations } from "../middleware/userValidation.js";

const router = express.Router();

router.post("/register",registerValidations, upload.single("image"), registerUser);
router.post("/login", loginUser);

export default router;
