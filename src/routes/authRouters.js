const express = require("express");
const router = new express.Router();
const { userControlClass } = require("../controlers/userControllers");
const userAuthorization = require("../middlewares/userAuthentication-middleware");

//Authentication Routes
router.post("/signup", userControlClass.userRegister);
router.post("/signin", userControlClass.userLogin);

//middleware
router.use("/change-password", userAuthorization);
// protected
router.use("/change-password", userControlClass.changePassword);

router.use("/logedin-user", userAuthorization);
router.use("/logedin-user", userControlClass.logedInUser);

router.post("/forget-password", userControlClass.forgotPassword);

module.exports = router;
