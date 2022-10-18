const express = require("express");
const router = new express.Router();
const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')
const randomstring = require('randomstring');
const e = require("express");
const { response } = require("express");

const sendResetPassword = async (name,email,token) => {
  try {
    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
        user:"saadmalik199917@gmail.com",
        pass:"**********"
      }
    });
    const options = {
      from: "saadmalik199917@gmail.com",
      to: email,
      subject: 'For Reset Password',
      html:'<p>Hii '+name+', <a href="http://localhost:5000/reset-password?token='+token+'">reset password<a/></p>'
    }
    transporter.sendMail(options,function(error,info){
      if(error){
        console.log(error);
      }
      else{
        console.log("mail has been sent",info);
      }
    })
  } catch (error) {
    response.status(400).send(error);
  }
}


router.get("/", (request, response) => {
  response.send("Hello Boy  abcd!");
});

router.post("/login", async (request, response) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(request.body.password, salt);
    const newUser = new Auth({ ...request.body, password: hash });
    await newUser.save();
    response.status(200).send("User has been created!");
  } catch (error) {
    response.status(400).send(error);
  }
});

//// Code  ////
router.post("/signin", async (request, response) => {
  const user = await Auth.findOne({ email: request.body.email });
  !user && response.status(200).send("Username & password are wrong!");
  const isCorrect = await bcrypt.compare(request.body.password, user.password);
  if(isCorrect){
    const tokenValue = "kakjsdhkjashd";
    const token = jwt.sign({id:user._id}, tokenValue);
    const {password, ...others} = user._doc;
    response.cookie("access_token", token, {httpOnly: true,}).status(200).json(others);

  }else{
    response.status(200).send("Username & password are wrong!");
  }
 
});

router.post("/forget-password",async(request,response)=>{
  try {
    const email = request.body.email;
  const UserData = await Auth.findOne({email:email});
  if(UserData){
const randomString = randomstring.generate();
const data = await Auth.updateOne({email:email},{$set:{token:randomString}});
sendResetPassword(UserData.name,UserData.email,randomString);
response.status(200).send("Please check your inbox");
  }
  } catch (error) {
    response.status(200).send("This email does not exist");
  }
})

module.exports = router;
