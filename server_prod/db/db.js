import mongoose from "mongoose";
import { MONGO_URL } from "../config/config.js";

async function connect() {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // TODO: Remove console log in production mode
        console.log("Database Connected Successfully!!");
    } catch (error) {
        console.error("Database connection error:", error.message);

    }
}

export default connect;
