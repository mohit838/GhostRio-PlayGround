import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { readdirSync } from "fs";
import { PORT } from "./config/envConfig.js";
import connect from "./database/db.js";

// Common Configuaraions
config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// All Routes
const routes = readdirSync("./routes");

routes.forEach(async (route) => {
  const routeModule = await import(`./routes/${route}`);
  app.use("/api", routeModule.default);
});

// MongoDB and Server Setups
const SERVER_PORT = PORT || 7000;

// Connect DB first then server started
connect().then(() => {
  app.listen(SERVER_PORT, () =>
    console.log(`Server Running On Port: ${SERVER_PORT}`)
  );
});
