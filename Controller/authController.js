const userModel = require("../Model/usersModel");
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const { SECRET_KEY,GMAIL_ID,GMAIL_PW } = require("../config/secret");



async function sendEmail(message) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: GMAIL_ID,
        pass: GMAIL_PW,
      },
    });

    let res = await transporter.sendMail({
      from: message.from, // sender address
      to: message.to, // list of receivers
      subject: message.subject, // Subject line
      text: message.text, // plain text body
    });
    return res;
  } catch (error) {
    return error;
  }
}

async function signup(req,res){
    try{
        // console.log(req.body);
        let user = req.body;
        let newUser =await userModel.create({
            name:user.name,
            email:user.email,
            password:user.password,
            confirmPassword:user.confirmPassword,
            role:user.role,
        });
        console.log(newUser);
        res.json({
            message: "Succesfully Signed up !!",
            data: newUser,
          });
    }
    catch(error){
        res.json({
            message: "Failed to sign up !!",
            error,
          });
    }
}
async function login(req,res){
    try{
        let {email,password} = req.body;
        let loggedInUser = await userModel.find({email});
        if(loggedInUser.length){
            let user = loggedInUser[0];
            if(user.password==password){
                // token dena h 
                const token = jwt.sign({id: user["_id"]},SECRET_KEY)
                res.cookie("jwt", token, { httpOnly: true });
                res.json({
                    message:"LoggedIn successfully",
                    data:loggedInUser[0],
                })
            }else{
                res.json({
                    message:"Email and password didn't match"
                })
            }
        }else{
            res.json({
                message:"signUp first!!"
            })
        }
    }
    catch(error){

    }

}

async function forgetpassword(req,res){
    try{
        // email nikal do
        let {email} = req.body;
        console.log(email);
        let user = await userModel.findOne({email:email});
        console.log(user);
        if(user){
          // pwToken
          // timeset
          let token = user.createResetToken();
          console.log(token);
          await user.save({validateBeforeSave:false});
          // console.log(updatedUser);
            let resetLink = `http://localhost:3000/resetpassword/${token}`;
            let message = {
              from:GMAIL_ID,
              to:email,
              subject:"Reset Password",
              text:resetLink
            }
            let response = await sendEmail(message);
          res.json({
            message:"Reset Link is sent to email",
            response,
          })
        }
        else{
          res.status(404).json({
            message:"User Not Found ! Please Sign up first !"
          })
        }
      }
      catch(error){
        res.json({
          message:"Failed to forget Password",
          error
        })
      }
}

async function resetpassword(req,res){
    try{
        const token = req.params.token;
        const {password , confirmPassword} = req.body;
        const user = await userModel.findOne({
          pwToken:token,
          tokenTime:{  $gt : Date.now() }
        })
        console.log(user);
        console.log(password , confirmPassword);
        if(user){
          user.resetPasswordHandler(password , confirmPassword);
          await user.save();
          res.status(200).json({
            message:"Password Reset Succesfull !!!"
          })
        }
        else{
          res.status(200).json({
            message:"Password Reset Link Expired !!!"
          })
        }
      }
      catch(error){
        res.status(404).json({
          message:"Failed to reset password",
          error
        })
      }
}

async function logout(req, res) {
  try {
    res.clearCookie('jwt');
    res.redirect("/");
  } catch (error) {
    res.status(501).json({
      error,
    });
  }
}

async function isLoggedIn(req, res, next) {
  try {
    let token = req.cookies.jwt;
    const payload = jwt.verify(token, SECRET_KEY);
    if (payload) {
      // logged in hai
      let user = await userModel.findById(payload.id);
      req.name = user.name;
      req.user = user;
      next();
    } else {
      //logged in nhi hai
      next();
    }
  } catch (error) {
    next();
  }
}

async function protectRoute(req,res,next){
    try{
        const token = req.cookies.jwt;
        // const token = req.headers.authorization.split(" ").pop();
        // console.log(token);
        // // const token = req.cookies.jwt;
        const payload = jwt.verify(token,SECRET_KEY);
        console.log(payload)
        if(payload){
            req.id = payload.id;
            next();
        }else{
            res.json({
                message:"please Login"
            })
        }
    }
    catch(error){
        res.json({
            message:"please Login!!",
            error
        })
    }
}

async function isAuthorised(req,res,next){
    try{
        let id = req.id;
        let user = await userModel.findById(id);
        console.log(user);
        if(user.role == "admin"){
          next();
        }else{
          res.status(200).json({
            message:"You dont have admin rights !!!"
          })
        }
      }
      catch(error){
        resjson({
          message:"Failed to Authorize",
          error
        })
      }
}
module.exports.signup= signup;
module.exports.login= login;
module.exports.protectRoute = protectRoute;
module.exports.isAuthorised = isAuthorised;
module.exports.forgetpassword = forgetpassword;
module.exports.resetpassword = resetpassword; 
module.exports.isLoggedIn = isLoggedIn;
module.exports.logout = logout;