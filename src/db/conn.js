const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/fyp-database")
  .then(() => {
    console.log("Successfully");
  })
  .catch(() => {
    console.log("No Connection");
  });
//// Code  ////