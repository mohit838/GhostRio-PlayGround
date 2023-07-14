import mongoose from "mongoose";
import { MONGO_URL } from "../config/envConfig.js";

async function connect() {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //TODO:: Need to be deleted when in production mode
    console.log("Database Connected Successfully!!");
    return db;
  } catch (error) {
    console.log(error.message);
    process.exit;
  }
}

export default connect;
