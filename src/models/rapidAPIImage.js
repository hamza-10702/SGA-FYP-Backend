const mongoose = require("mongoose");

// const rapidImageSchema = mongoose.Schema({
//   image: {
//     data: Buffer,
//     contentType: String
//   },
// });
const rapidImageSchema = mongoose.Schema({
  image: String,
});

const imageModel = new mongoose.model("ScanImage", rapidImageSchema);
module.exports = imageModel;
