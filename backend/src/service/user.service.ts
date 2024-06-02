import { User } from "../models/User"
import { compare, hash } from "bcrypt"
import { sign } from "jsonwebtoken"
import {v4} from "uuid"
class UserService {

    private userModel: any;
    constructor() {
        this.userModel = User;
    }

    async loginUserWithEmail(data: any) {
        try {
            const { userNameOrEmail, password } = data;
            const isUserExist = await this.userModel.findOne({
                where: {
                    emailOfUser:userNameOrEmail
                }
            })
            if (isUserExist) {
                const match = await compare(password, isUserExist.password)
                if (match) {
                    const token = sign({userId:isUserExist.userId},process.env.JWT_SECRET as string);
                    return token;
                } else {
                    return -1;
                }
            } else {
                return 0;
            }
        } catch (error) {
            console.log("Error occurred in login service: ", error)
        }
    }

    async loginUserWithUserName(data: any) {
        try {
            const { userNameOrEmail, password } = data;
            const isUserExist = await this.userModel.findOne({
                where: {
                    userName:userNameOrEmail
                }
            })
            if (isUserExist) {
                const match = await compare(password, isUserExist.password)
                if (match) {
                    const token = sign({userId:isUserExist.userId},process.env.JWT_SECRET as string);
                    return token;
                } else {
                    return -1;
                }
            } else {
                return 0;
            }
        } catch (error) {
            console.log("Error occurred in login service: ", error)
        }
    }

    async registerUser(data:any) {
        try {
            const isUserExistWithEmail = await this.userModel.findOne({
                where: {
                    emailOfUser:data.emailOfUser
                }
            })
            const isUserExistWithUsername = await this.userModel.findOne({
                where: {
                    emailOfUser:data.userName
                }
            })
            if(isUserExistWithEmail||isUserExistWithUsername){
                return 0;
            }else{
                const password = data.password;
                const userId = v4();
                const hashedPassword = await hash(password,12);
                const newCreatedUser = await this.userModel.create({
                    userId,
                    ...data,
                    password:hashedPassword
                })
                return newCreatedUser;
            }
        } catch (error) {
            console.log("Error occurred in register service: ", error)
        }
    }

    async forgetPassword() {
        try {

        } catch (error) {
            console.log("Error occurred in forgetPassword service: ", error)
        }
    }

    async resetPassword() {
        try {

        } catch (error) {
            console.log("Error occurred in login service: ", error)
        }
    }
}


export default UserService