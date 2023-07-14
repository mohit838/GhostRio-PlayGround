import { Router } from "express";
import * as authUserContoller from "../controllers/authUserControllers.js";
import auth from "../middleware/auth.js";

const router = Router();

router
  .post("/auth/view/register", authUserContoller.registerUser)
  .post("/auth/view/login", authUserContoller.logInUser)
  .post("/auth/refresh-token", auth, authUserContoller.refreshToken)
  .post("/auth/logout", auth, authUserContoller.logOut);

export default router;
