const mongoose = require("mongoose");

const DB = 'mongodb+srv://SaadMalik:saad03212710920@cluster0.124ticf.mongodb.net/fyp-backend?retryWrites=true&w=majority'
mongoose
  .connect(DB)
  .then(() => {
    console.log("Successfully");
  })
  .catch(() => {
    console.log("No Connection");
  });
//// Code  ////

//"mongodb://localhost:27017/fyp-database"//