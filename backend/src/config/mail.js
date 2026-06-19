import nodeMailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config()

const transporter = nodeMailer.createTransport({
    service: "gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const sendMail = async (userMail, otp)=>{
  
    transporter.sendMail({
        from:process.env.EMAIL,
        to:userMail,
        subject:"Reset your password",
        html:`<p>your OTP for password reset is <b>${otp}</b>.
        It expires in 5 minutes.</p>`
    })
}

export default sendMail