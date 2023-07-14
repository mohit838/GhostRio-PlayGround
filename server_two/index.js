import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { PORT } from "./config/envConfig.js";
import connect from "./database/db.js";
import userRouters from "./routes/userRoutes.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ALL ROUTES */
app.use("/api/auth", userRouters);

/* MONGOOSE AND SERVER SETUP */
const SERVER_PORT = PORT || 7000;

connect().then(() => {
  app.listen(SERVER_PORT, () =>
    console.log(`Server Running On Port: ${SERVER_PORT}`)
  );
});
