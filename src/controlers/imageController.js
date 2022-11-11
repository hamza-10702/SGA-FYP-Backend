const FormData = require("form-data");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const requests = require("request");

class imageController {
  static scanImage = async (request, response) => {
    console.log(request.file);
    if (!request.file) {
      response.send({
        status: "Failed",
        Message: "Image Didn't Find!",
      });
    } else {
      const directory = path.resolve('src/images');

      console.log(directory)
      fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err;
          });
        }
      });
    }
    //  else {
    //   const options = {
    //     method: "POST",
    //     url: "https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/",
    //     headers: {
    //       "content-type":
    //         "multipart/form-data; boundary=---011000010111000001101001",
    //       "X-RapidAPI-Key":
    //         "40bee9d0fdmshf7baaadbddd5d59p15e1eejsn2e91990e5673",
    //       "X-RapidAPI-Host": "pen-to-print-handwriting-ocr.p.rapidapi.com",
    //       useQueryString: true,
    //     },
    //     formData: {
    //       srcImg: {
    //         value: fs.createReadStream(request.file.path),
    //         options: {
    //           filename: request.file.filename,
    //           contentType: "application/octet-stream",
    //         },
    //       },
    //       Session: "string",
    //     },
    //   };

    //   requests(options, function (error, res, body) {
    //     try {
    //       if (body) {
    //         let objectBody = JSON.parse(body);
    //         const value = objectBody.value.split("\n");

    //         response.status(200).send({
    //           Status: "Success",
    //           Message: objectBody.value,
    //         });
    //       }

    //     } catch (err) {
    //       if (error) {
    //         response.status(200).send({
    //           Status: "Failed",
    //           Error: error,
    //         });
    //       }
    //     }
    //   });
    // }
  };

  // static scanImage = async (request, response) => {
  //   if (!request.file) {
  //     response.send({
  //       status: "Failed",
  //       Message: "Image Didn't Find!",
  //     });
  //   } else {
  //     try {
  //       // let img = fs.readFileSync(request.file.path);
  //       // let encodeImage = img.toString("base64");
  //       const newImage = new imageModel({
  //         image: request.file.filename,
  //       });
  //       const imageData = await newImage.save();
  //       response.status(200).send({
  //         status: "Success",
  //         Message: "Image Saved Successfuly",
  //         Image: request.file,
  //         Binary: imageData,
  //       });
  //     } catch (error) {
  //       response.send({
  //         status: "Failed",
  //         Message: "Image Didn't Saved!",
  //       });
  //     }
  //   }
  // };
}

module.exports = imageController;
