import bodyParser from "body-parser"; // remove This body parser
import cors from "cors";
import express from "express";
import { readdirSync } from "fs";
import { PORT } from "./config/config.js";
import connect from "./db/db.js";
import {Helmet} from "react-helmet";

// Base Configurations
const app = express();
app.use(express.json());

// Enabling the Helmet middleware
app.use(Helmet())

// Use Express built-in middleware
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Cors Policies
// Restrictions in accessing
app.use(
  cors({
    // If you want to allow requests from any origin, you can set origin: '*'.
    origin: "http://localhost:3000", // If you want any restrictions then set frontend url
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// All Routers of this projects
const routes = readdirSync("./routes");
routes.forEach(async (route) => {
  const routeModule = await import(`./routes/${route}`);
  app.use("/api", routeModule.default);
});

// MongoDB and Server Setups
const SERVER_PORT = PORT || 8000;

// Connect DB first then server started
connect().then(() => {
  app.listen(SERVER_PORT, () =>
    console.log(`Nymphelia Server Running On Port: ${SERVER_PORT}`)
  );
});
