const mongoose = require("mongoose");


// DATABASE_URL = "mongodb://localhost:27017";
// DATABASE_URL = 'mongodb+srv://SaadMalik:saad03212710920@cluster0.124ticf.mongodb.net/fyp-backend?retryWrites=true&w=majority';
const connectDB = async (DATABASE_URL) => {
  try {
    // db connection options

    await mongoose.connect(DATABASE_URL);
    console.log("DataBase Successfully connected...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
