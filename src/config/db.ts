import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
    try {

        mongoose.connection.on('connected', () => {
            console.log("database is successfully connected");
        });

        mongoose.connection.on('error', (error) => {
            console.log("error in connecting to db", error);
        })

        await mongoose.connect(config.databaseURL)

    } catch (error) {
        console.log("Failed to connect to db", error)
        process.exit(1);
    }
}

export default connectDB;