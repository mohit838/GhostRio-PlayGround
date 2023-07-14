import { Router } from "express";
import { userDashboard } from "../controllers/dashboardControllers.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/dashboard", auth, userDashboard);

export default router;
