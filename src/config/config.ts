import { config as conf } from "dotenv";

conf();

interface IConfig {
    port: string,
    databaseURL: string,
    env: string,
    jwtSecret: string,
    cloudinaryCloud: string,
    cloudinaryApiKey: string,
    cloudinaryApiSecret: string,
}

const _config: IConfig = {
    port: process.env.PORT!,
    databaseURL: process.env.MONGO_CONNECTION_URI!,
    env: process.env.NODE_ENV!,
    jwtSecret: process.env.JWT_SECRET!,
    cloudinaryCloud: process.env.CLOUDINARY_CLOUD!,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY!,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET!,
}

export const config = Object.freeze(_config);