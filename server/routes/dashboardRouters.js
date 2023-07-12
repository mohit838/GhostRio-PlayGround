import express from "express";
import { dashboardHome } from "../controllers/dashboardControllers.js";
import { Auth } from "../helper/auth.js";

const router = express.Router();

router.get("/dashboard", Auth.authorized, dashboardHome);

export default router;
