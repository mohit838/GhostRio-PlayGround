import express from "express";
import { createStore } from "../controllers/storeControllers.js";
import { Auth } from "../helper/auth.js";
import { storeImageUpload } from "../helper/helper.js";

const router = express.Router();

router.post(
  "/create-store",
  storeImageUpload.single("storeLogo"),
  Auth.authorized,
  createStore
);

export default router;
