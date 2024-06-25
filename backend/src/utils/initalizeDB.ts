import { User } from "../models/User";
import { v4 } from "uuid";
import { hash } from "bcrypt";
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve("./src/.env") })


const initialCred = {
    userName: process.env.ADMIN_UNAME,
    emailOfUser: process.env.ADMIN_EMAIL,
    firstName: process.env.ADMIN_FNAME,
    lastName: process.env.ADMIN_LNAME,
    role: process.env.ADMIN_ROLE,
    password: process.env.ADMIN_PASSWORD
}

const seedDatabaseFunction = async () => {
    try {
        const hashedPassword = await hash(initialCred.password as string, 12);
        const admin = await User.create({
            userId: v4(),
            ...initialCred,
            password: hashedPassword
        })
        return {
            status: 200,
            admin
        };
    } catch (error) {
        console.log("Error in seed function: ", error)
    }
}

export default seedDatabaseFunction;