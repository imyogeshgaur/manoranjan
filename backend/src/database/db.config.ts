import { Sequelize } from "sequelize";
import {resolve} from "path";
import {config} from "dotenv";
config({path:resolve("./src/.env")})

export const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect:'mysql'
})

export const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Db Connected !!!")
    } catch (error) {
        console.log("Error occurred while connecting with DB !!!", error)
    }
}

