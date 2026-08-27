import "reflect-metadata"
import { DataSource } from "typeorm"

import dotenv from "dotenv";
dotenv.config();

const dialect = process.env.DB_DIALECT ?? "mysql";
export const AppDataSource = new DataSource({
    type: dialect as "mysql" | "mariadb" | "postgres" | "mongodb",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "060317",
    database: process.env.DB_DATABASE || "nodeapi",
    synchronize: false,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
})