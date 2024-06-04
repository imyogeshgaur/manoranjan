import UserService from "../service/user.service";
import { Request, Response } from "express"
class UserController {

    private req: Request;
    private res: Response;
    private service: UserService;
    constructor(request: Request, response: Response) {
        this.req = request;
        this.res = response;
        this.service = new UserService();
    }

    async loginUser() {
        try {
            const isAnEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(this.req.body.userNameOrEmail);
            if (isAnEmail) {
                const tokenReturned = await this.service.loginUserWithEmail(this.req.body);
                if (tokenReturned === -1 || tokenReturned === 0) return this.res.send({ message: "Invalid Credentials !!!" })
                else this.res.send({ message: tokenReturned })
            } else {
                const tokenReturned = await this.service.loginUserWithUserName(this.req.body);
                if (tokenReturned === -1 || tokenReturned === 0) return this.res.send({ message: "Invalid Credentials !!!" })
                else this.res.send({ message: tokenReturned })
            }
        } catch (error) {
            console.log("Error occurred at login controller : ", error);
            return this.res.send({ message: "Internal Server Error !!!" })
        }
    }

    async registerUser() {
        try {
            const newUserReturned = await this.service.registerUser(this.req.body);
            if (newUserReturned === 0) return this.res.send({ message: "User already Exist !!!" })
            else return this.res.send({ message: "User registered Successfully !!!" })
        } catch (error) {
            console.log("Error occurred at registration controller : ", error);
            return this.res.send({ message: "Internal Server Error !!!" })
        }
    }

    async forgetPassword() {
        try {
            const response = await this.service.forgetPassword(this.req.body.emailOfUser);
            if (response) return this.res.send({ message: "Email Sent Successfully !!!" })
            else return this.res.send({ message: "Some Error Occurred !!!" })
        } catch (error) {
            console.log("Error occurred at forget password controller : ", error);
            return this.res.send({ message: "Internal Server Error !!!" })
        }
    }

    async resetPassword() {
        try {
            const response = await this.service.resetPassword(this.req.params.userId, this.req.body.password);
            if (response) return this.res.send({ message: "Password Reset Successfully !!!" })
            else return this.res.send({ message: "Some error occurred !!!" })
        } catch (error) {
            console.log("Error occurred at forget password controller : ", error);
            return this.res.send({ message: "Internal Server Error !!!" })
        }
    }
}

export default UserController;