import { User } from "../models/User"
import { compare, hash } from "bcrypt"
import { sign } from "jsonwebtoken"
import { v4 } from "uuid"
import { passwordResetMail } from "../utils/sendEmail";
import { forgetPasswordTemplate } from "../template/forgotPassword";
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve("./src/.env") })

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
                    emailOfUser: userNameOrEmail
                }
            })
            if (isUserExist) {
                const match = await compare(password, isUserExist.password)
                if (match) {
                    const token = sign({ userId: isUserExist.userId }, process.env.JWT_SECRET as string);
                    if (isUserExist.role == "admin") return { token, flag: 1, status: 200 };
                    else return { token, flag: 0, status: 200 }
                } else {
                    return { token: "Invalid Credentials!!!", flag: -1, status: 401 };
                }
            } else {
                return { token: "Invalid Credentials!!!", flag: -1, status: 401 }
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
                    userName: userNameOrEmail
                }
            })
            if (isUserExist) {
                const match = await compare(password, isUserExist.password)
                if (match) {
                    const token = sign({ userId: isUserExist.userId }, process.env.JWT_SECRET as string);
                    if (isUserExist.role == "admin") return { token, flag: 1, status: 200 };
                    else return { token, flag: 0, status: 200 }
                } else {
                    return { token: "Invalid Credentials!!!", flag: -1, status: 401 };
                }
            } else {
                return { token: "Invalid Credentials!!!", flag: -1, status: 401 };
            }
        } catch (error) {
            console.log("Error occurred in login service: ", error)
        }
    }

    async registerUser(data: any) {
        try {
            const isUserExistWithEmail = await this.userModel.findOne({
                where: {
                    emailOfUser: data.emailOfUser
                }
            })
            const isUserExistWithUsername = await this.userModel.findOne({
                where: {
                    userName: data.userName
                }
            })
            if (isUserExistWithEmail || isUserExistWithUsername) {
                return 0;
            } else {
                const password = data.password;
                const userId = v4();
                const hashedPassword = await hash(password, 12);
                const newCreatedUser = await this.userModel.create({
                    userId,
                    ...data,
                    password: hashedPassword
                })
                return newCreatedUser;
            }
        } catch (error) {
            console.log("Error occurred in register service: ", error)
        }
    }

    async forgetPassword(emailOfUser: string) {
        try {
            const user: any = await User.findOne({ where: { emailOfUser } })
            const content = forgetPasswordTemplate(user.userId, user.userName);
            const responseFromHelper = await passwordResetMail(emailOfUser, "Team Manoranjan - Password Reset", content);
            return responseFromHelper;
        } catch (error) {
            console.log("Error occurred in forgetPassword service: ", error)
        }
    }

    async resetPassword(userId: string, password: string) {
        try {
            const hashedPassword = await hash(password, 12);
            const response = await User.update(
                { password: hashedPassword },
                { where: { userId } }
            );
            if (response[0]) return 1;
            else return 0;
        } catch (error) {
            console.log("Error occurred in resetPassword service: ", error)
        }
    }
}


export default UserService