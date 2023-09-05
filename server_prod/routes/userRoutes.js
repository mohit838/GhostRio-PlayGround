import express from "express";
import * as userController from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, userController.allUsers);

export default router;
