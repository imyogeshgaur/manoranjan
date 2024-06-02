import { connectToDb } from "./database/db.config";
import userRouter from "./routes/user.route";
import cors from "cors"
import express,{urlencoded,json} from 'express'
const app = express();


connectToDb()

app.use(json())
app.use(urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5134",
}))

app.use("/api/user",userRouter);

app.listen(4000)