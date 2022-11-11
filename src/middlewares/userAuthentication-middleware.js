const express = require("express");
const jwt = require("jsonwebtoken");
const userAuthenticationModel = require("../models/auth");
const {secretKey} = require("../controlers/userControllers")

const userAuthorization = async (request, response, next) => {
  let token;
  const { authorization } = request.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { userId } = jwt.verify(token, secretKey);
      request.user = await userAuthenticationModel
        .findById(userId)
        .select("-password");
      next();
    } catch (error) {
      response
        .status(401)
        .send({ Status: "Failed", Message: "Un Authorized User" });
    }
  } else {
    response
      .status(401)
      .send({ Status: "Failed", Message: "Un Authorized User" });
  }
};

module.exports = userAuthorization;
