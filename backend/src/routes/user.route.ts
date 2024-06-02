import {Request,Response,Router} from "express"
import UserController from '../controller/User'
const userRouter = Router();

userRouter.post("/login",async(req:Request,res:Response)=>{
    try {
        const userController = new UserController(req,res);
        await userController.loginUser();
    } catch (error) {
        console.log("Global Error :",error);
    }
})
userRouter.post("/register",async(req:Request,res:Response)=>{
    try {
        const userController = new UserController(req,res);
        await userController.registerUser();
    } catch (error) {
        console.log("Global Error :",error);

    }
})

export default userRouter