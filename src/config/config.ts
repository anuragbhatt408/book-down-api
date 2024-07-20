import { config as conf } from "dotenv";

conf();

interface IConfig {
    port: string,
    databaseURL: string,
    env: string
}

const _config: IConfig = {
    port: process.env.PORT!,
    databaseURL: process.env.MONGO_CONNECTION_URI!,
    env: process.env.NODE_ENV!,
}

export const config = Object.freeze(_config);