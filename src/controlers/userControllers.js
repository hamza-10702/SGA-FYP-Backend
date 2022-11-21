const userAuthenticationModel = require("../models/auth");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "2hurHRUI34SEqwt45";

class userController {
  static userRegister = async (request, response) => {
    const { fullName, email, password, confirmPassword } = request.body;
    const checkUserEmail = await userAuthenticationModel.findOne({
      email: email,
    });
    // console.log(fullName, email, password, confirmPassword);
    if (checkUserEmail) {
      console.log(checkUserEmail);
      response.send({ status: "Failed", Message: "Email Already used" });
    } else {
      if (fullName && email && password && confirmPassword) {
        if (password === confirmPassword) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const userCreate = new userAuthenticationModel({
              fullName,
              email,
              password: hashPassword,
            });
            await userCreate.save();
            const savedUser = await userAuthenticationModel.findOne({
              email: email,
            });
            const token = jwt.sign({ userId: savedUser._id }, SECRET_KEY, {
              expiresIn: "2d",
            });
            response.status(200).send({
              status: "Success",
              Message: "User Successfully signUp",
              Token: token,
            });
          } catch (error) {
            response.status(400).send({
              status: "Failed",
              Message: "Unable to Register",
            });
          }
        } else {
          response.status(400).send({
            status: "Failed",
            Message: "Password & Confirm Password doesn't Matched",
          });
        }
      } else {
        response.status(400).send({
          status: "Failed",
          Message: "All Fields are required",
        });
      }
    }
  };

  static userLogin = async (request, response) => {
    try {
      const { email, password } = request.body;
      if (email && password) {
        const checkUserExist = await userAuthenticationModel.findOne({
          email: email,
        });
        if (checkUserExist) {
          const isPasswordMatched = await bcrypt.compare(
            password,
            checkUserExist.password
          );
          if (checkUserExist.email === email && isPasswordMatched) {
            const token = jwt.sign({ userId: checkUserExist._id }, SECRET_KEY, {
              expiresIn: "2d",
            });
            response
              .status(200)
              .send({ status: "Success", Message: "Welcome", Token: token });
          } else {
            response.status(400).send({
              status: "Failed",
              Message: "Invalid UserfullName OR Password",
            });
          }
        } else {
          response
            .status(400)
            .send({ status: "Failed", Message: "User must be Registered" });
        }
      } else {
        response.status(400).send({
          status: "Failed",
          Message: "All Fields are required",
        });
      }
    } catch (error) {
      console.log(error);
      response
        .status(400)
        .send({ status: "Failed", Message: "Unable to Login" });
    }
  };

  static changePassword = async (request, response) => {
    const { password, confirmPassword } = request.body;
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await userAuthenticationModel.findByIdAndUpdate(request.user._id, {
          $set: { password: newHashPassword },
        });
        response.send({ Status: "Success", Message: "Password Succesfuly Changed" });
      } else {
        response.send({
          Status: "Failed",
          Message: "Password and Confirm Password must Matched",
        });
      }
    } else {
        response.send({ Status: "Failed", Message: "All field must be filled" });
    }
  };

  static logedInUser = async (request, response) => {
    response.send({ UserID: request.user });
  };


  static sendResetPassword = async (fullName, email, token) =>{
    try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: "saadmalik199917@gmail.com",
            pass: "**********",
          },
        });
        const options = {
          from: "saadmalik199917@gmail.com",
          to: email,
          subject: "For Reset Password",
          html:
            "<p>Hii " +
            fullName +
            ', <a href="http://localhost:5000/reset-password?token=' +
            token +
            '">reset password<a/></p>',
        };
        transporter.sendMail(options, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("mail has been sent", info);
          }
        });
      } catch (error) {
        response.status(400).send(error);
      }
  }



  static forgotPassword  = async (request, response) => {
    try {
      const email = request.body.email;
      const UserData = await userAuthenticationModel.findOne({ email: email });
      if (UserData) {
        const randomString = randomstring.generate();
        const data = await userAuthenticationModel.updateOne(
          { email: email },
          { $set: { token: randomString } }
        );
        sendResetPassword(UserData.fullName, UserData.email, randomString);
        response.status(200).send("Please check your inbox");
      }
    } catch (error) {
      response.status(200).send("This email does not exist");
    }
  }
}

module.exports = {
  userControlClass: userController,
  secretKey: SECRET_KEY,
};
// module.exports = userController;
