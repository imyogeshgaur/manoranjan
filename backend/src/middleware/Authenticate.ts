import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {resolve} from "path";
import {config} from "dotenv";
config({path:resolve("./src/.env")})

const authorization = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token:any = req.headers.authorization;
        const validToken = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!validToken) {
            return res.status(401).send({ message: "Not Authorized !!!" })
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send("Authorization Error !!!");
    }
}

export default authorization;