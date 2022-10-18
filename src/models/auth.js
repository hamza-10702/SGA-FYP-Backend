const mongoose = require("mongoose");
const validator = require("validator");

//// Code  ////
const authSchema = mongoose.Schema(
  {
    name: {
      type: String,
      rquired: true,
      minlength: 3,
      unique: [true, "username is already present"],
    },

    email: {
      type: String,
      rquired: true,
      unique: [true, "Email Id already present"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Error");
        }
      },
    },
    password: {
      type: String,
      rquired: true,
    },
    token: {
      type: String,
      default: ''
    },
  },
  { timestamps: true }
);

const Auth = new mongoose.model("Auth", authSchema);

module.exports = Auth;
