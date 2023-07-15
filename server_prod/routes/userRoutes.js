import express from "express";
import * as userController from "../controllers/userControllers.js";
import {userMiddleware} from "../middlewares/uesrMiddleware.js";

const router = express.Router()

router.get('/users',userMiddleware, userController.allUsers);

export default router