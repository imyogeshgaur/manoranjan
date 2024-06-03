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

userRouter.post("/forgetPassword",async(req:Request,res:Response)=>{
    try {
        const userController = new UserController(req,res);
        await userController.forgetPassword();
    } catch (error) {
        console.log("Global Error :",error);
    }
})

userRouter.put("/resetPassword/:userId",async(req:Request,res:Response)=>{
    try {
        const userController = new UserController(req,res);
        await userController.resetPassword();
    } catch (error) {
        console.log("Global Error :",error);
    }
})

export default userRouter