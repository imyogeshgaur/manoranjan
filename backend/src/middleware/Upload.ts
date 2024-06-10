import multer from "multer"
import { Request } from "express";
import {config} from "dotenv";
import {resolve,extname} from "path";
config({path:resolve("./src/.env")})


const tempVideoStorage = multer.diskStorage({
    destination: function (req:Request, file:any, callback:Function) {  
        const pathToFolder = resolve(process.env.VIDEO_UPLOAD_FOLDER as string)
        callback(null, pathToFolder);
    },
    filename: function (req: Request, file: any, callback: Function) {
        callback(null,req.body.videoId + extname(file.originalname))
    }
});

export const uploadVideo = multer({ storage: tempVideoStorage }).single("videoToUpload");
