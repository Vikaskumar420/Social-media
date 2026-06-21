import sendMail from "../config/mail.js";
import genToken from "../config/token.js";
import User from "../models/User.model.js";
import bcrypt from 'bcryptjs'

// create a new user
export const signUp = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    if(name.length<3){
      return res.status(400).json({
        message:"name must be atleast 3 character!"
      })
    }
     if(username.length<6){
      return res.status(400).json({
        message:"username must be atleast 6 character!"
      })
    }
     if(email.length<13){
      return res.status(400).json({
        message:"enter a vailid email!"
      })
    }
     if(password.length<6){
      return res.status(400).json({
        message:"password must be atleast 6 character!"
      })
    }

    const findByUserName = await User.findOne({ username });
    if (findByUserName) {
      return res.status(400).json({
        success: false,
        message: "account already exist with this username already!"
      })
    }

    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({
        success: false,
        message: "account already exist with this email!"
      })
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict"
    })

    return res.status(201).json({
      success: true,
      message: "user signUp successfully!",
      user
    })


  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `signUp error ${error}`
    })
  }
}

//logIn user
export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;

     if(username.length<6){
      return res.status(400).json({
        message:"username must be atleast 6 character!"
      })
    }
    
     if(password.length<6){
      return res.status(400).json({
        message:"password must be atleast 6 character!"
      })
    }


    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "username is wrong!"
      })
    }


    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: " password is wrong!"
      })
    }


    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict"
    })

    res.status(201).json({
      success: true,
      message: "user login successfully!",
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `signin error ${error}`
    })
  }
}


//logOut user
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "logOut successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `logOut erroe ${error}`
    })
  }
}

//step 1
//send otp
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
     if(email.length<13){
      return res.status(400).json({
        message:"enter a vailid mail!"
      })
    }
    // console.log(email);

    // find user on the basis of email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "enter a vailid mail!"
      })
    }
    // console.log(user);


    // generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(otp);


    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save()
    await sendMail(email, otp);

    res.status(200).json({
      success: true,
      message: "email send successfully!"
    })
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: `sendOtp error:  ${error}`
    })
  }

}

//step 2
// verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
   
    // find user on the basis of email
    const user = await User.findOne({ email })

    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "invailid or expired OTP"
      })
    }

    if (otp.length !== 4) {
      return res.status(400).json({
        success: false,
        message: "OTP must be 4 digits",
      });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verify successfully!"
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: `otp verify error:  ${error}`
    })
  }


}

//step 3
//reset Password
export const resetPassword = async (req, res) => {
  try {

    const { email, password } = req.body;

     if(password.length<6){
      return res.status(400).json({
        message: "password must be atleast 6 character!"
      })
    }

    // find user on the basis of email
    const user = await User.findOne({ email })

    if (!user || !user.isOtpVerified) {
      return res.status(400).json({
        success: false,
        message: "otp verification is required!"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "password reset successfully!"
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: `reset Password error:  ${error}`
    })
  }
}