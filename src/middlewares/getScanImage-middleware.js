const multer = require("multer");
const fs = require("fs");

// let storage = multer.diskStorage({
//   destination: (request, file, cb) => {
//     const dest = "../uploads";
//     fs.access(dest, function (error) {
//       if (error) {
//         console.log("Directory does not exist.");
//         return fs.mkdir(dest, (error) => cb(error, dest));
//       } else {
//         console.log("Directory exists.");
//         console.log(__dirname)
//         return cb(null, dest);
//       }
//     });
//   },
//   filename: (request, file, cb) => {
//     const ext = file.originalname.split(".")[1];
//     cb(null, file.fieldname + "-" + Date.now() + `.${ext}`);
//   },
// });

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `src/images`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (request, file, cb) => {
    const ext = file.originalname.split(".")[1];
    cb(null, file.fieldname + "-" + Date.now() + `.${ext}`);
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      req.fileValidationError = "Only image files are allowed!";
      return cb(null, false);
    }
    cb(null, true);
  },
});

const getImage = multer({
  storage: storage,
});

module.exports = getImage;
