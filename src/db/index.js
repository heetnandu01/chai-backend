import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL;

        if (!mongoUrl) {
            throw new Error("MONGODB_URL is not set in .env");
        }

        if (mongoUrl.includes("<") || mongoUrl.includes(">")) {
            throw new Error("MONGODB_URL still contains placeholder values. Replace the username and password in .env with real MongoDB Atlas credentials.");
        }

        const connectionUrl = new URL(mongoUrl);

        if (!connectionUrl.pathname || connectionUrl.pathname === "/") {
            connectionUrl.pathname = `/${DB_NAME}`;
        }

        const connectionInstance = await mongoose.connect(connectionUrl.toString())
        console.log(`\n MongoDb coonected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1)
    }
}


export default connectDB