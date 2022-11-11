const mongoose = require("mongoose");
const validator = require("validator");

//// Code  ////
const authSchema = mongoose.Schema(
  {
    name: {
      type: String,
      rquired: true,
      minlength: 3,
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
  },
  { timestamps: true }
);

const userAuthenticationModel = new mongoose.model("Auth", authSchema);

module.exports = userAuthenticationModel;
