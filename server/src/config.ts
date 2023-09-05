import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

const configData = {
    PORT: process.env.PORT,
    dbName: process.env.DB_NAME as string,
    JWT_KEY: process.env.JWT_KEY as string,
    STORAGE_NAME: process.env.STORAGE_NAME as string,
    STORAGE_API_KEY: process.env.STORAGE_API_KEY as string,
    STORAGE_API_SECRET: process.env.STORAGE_API_SECRET as string,
    STRIP_SECRET_KEY: process.env.STRIP_SECRET_KEY as string,

    // CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    // CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    // CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    // OKAYA_ADMIN_API_KEY: process.env.OKAYA_ADMIN_API_KEY,
    // VONAGE_SMS_API_PRIVATE_KEY: process.env.VONAGE_SMS_API_PRIVATE_KEY,
    // VONAGE_API_KEY: process.env.VONAGE_API_KEY,
    // VONAGE_API_SECRET: process.env.VONAGE_API_SECRET,
    // VONAGE_APP_ID: process.env.VONAGE_APP_ID,
    // VONAGE_PRIVATE_KEY_PATH: './keys/private.key',
    // SAHHA_CLIENT_ID: process.env.SAHHA_CLIENT_ID,
    // SAHHA_CLIENT_SECRET: process.env.SAHHA_CLIENT_SECRET,
};

export default configData;