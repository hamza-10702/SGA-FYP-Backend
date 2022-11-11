const express = require("express");
const router = new express.Router();
const imageController = require("../controlers/imageController");
const getImage = require('../middlewares/getScanImage-middleware')



router.post("/scan-image", getImage.single('scanImage') ,imageController.scanImage);



module.exports = router
