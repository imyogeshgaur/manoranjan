import { connectToDb } from "./database/db.config";
import userRouter from "./routes/user.route";
import videoRouter from "./routes/video.route";
import cors from "cors"
import {join} from "path"
import express,{urlencoded,json} from 'express'
const app = express();

connectToDb()

app.use(json())
app.use(urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
}))

app.use("/static/video",express.static(join(process.cwd(),"/src/uploads")))

app.use("/api/user",userRouter);
app.use("/api/video",videoRouter);

app.listen(4000)