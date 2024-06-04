import nodemailer from "nodemailer";
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve("./src/.env") })

export const passwordResetMail = async (receiverMail: any, subjectOfMail: any, contentOfMail: any) => {
    const mailOptions = {
        from: process.env.SERVICE_EMAIL_USER as string,
        to: receiverMail,
        subject: subjectOfMail,
        html: contentOfMail,
    }
    try {
        const passwordResetTransport = nodemailer.createTransport({
            host: process.env.SERVICE_SMTP_HOST as string,
            port: 587,
            auth: {
                user: process.env.SERVICE_EMAIL_USER as string,
                pass: process.env.SERVICE_EMAIL_PASSWORD as string
            }
        })
        const response = await passwordResetTransport.sendMail(mailOptions)
        if(response.accepted.length!=0){
            return 1
        }else{
            return 0
        }
    } catch (error) {
        console.log("Password Reset Mail's Helper Error : ", error)
    }
}