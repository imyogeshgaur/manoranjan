import { Request, Response, Router } from "express"
import UserController from '../controller/User'
import seedDatabaseFunction from "../utils/initalizeDB";
const userRouter = Router();

userRouter.get("/seed", async (req: Request, res: Response) => {
    try {
        const { status, admin }: any = await seedDatabaseFunction();
        return res.status(status).send({ admin })
    } catch (error) {
        console.log("Global Error :", error);
    }
})

userRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.loginUser();
    } catch (error) {
        console.log("Global Error :", error);
    }
})

userRouter.post("/register", async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.registerUser();
    } catch (error) {
        console.log("Global Error :", error);
    }
})

userRouter.post("/forgetPassword", async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.forgetPassword();
    } catch (error) {
        console.log("Global Error :", error);
    }
})

userRouter.put("/resetPassword/:userId", async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.resetPassword();
    } catch (error) {
        console.log("Global Error :", error);
    }
})

export default userRouter