import express from "express";
import * as authController from "../controllers/authControllers.js";

const router = express.Router()

router.post('/signin', authController.userSignIn);

export default router