import mongoose from "mongoose";
import app from "./app";
import configData from "./config";

async function databaseConnection() {
    try {
        // database connection
        await mongoose.connect(`mongodb://127.0.0.1:27017/${configData.dbName}`);
        console.log("database connect successfully");
        app.listen(configData.PORT, () => {
            console.log(`Server is listening on port ${configData.PORT} \nopen with---------------- http://localhost:${configData.PORT}/ ----------------- or http://127.0.0.1:${configData.PORT}/`)
        })
    } catch (error) {
        console.log("not possible to connect");
        console.error(error);
    }
}
databaseConnection();
