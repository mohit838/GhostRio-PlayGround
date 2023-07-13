import express from "express";
import { createCategory } from "../controllers/categoryControllers.js";
import { createStore } from "../controllers/storeControllers.js";
import { Auth } from "../helper/auth.js";
import { storeImageUpload } from "../helper/helper.js";

const router = express.Router();

router
  .post(
    "/create-store",
    storeImageUpload.single("storeLogo"),
    Auth.authorized,
    createStore
  )
  .post("/create-category", Auth.authorized, createCategory);

export default router;
