import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_CODE = "Ws2J3KsZW56KBljBwBbJSjkeZ9jsT4c7";
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const BACKEND = process.env.BACKEND;

export { BACKEND, EMAIL, JWT_CODE, MONGO_URL, PASSWORD, PORT };
