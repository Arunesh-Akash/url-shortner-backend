const express = require("express");
const { mongoose } = require("mongoose");
const AppUtils = require("../AppUtils");
const Constants = require("../Constants");
const loginRouter = express.Router();
const SignupSchema = require("../Schema/signupRouter");
const sign = mongoose.model("users", SignupSchema, "users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res) => {
  const request = {
    email: req.body.email,
    password: req.body.password,
  };

  if (AppUtils.checkError(request, Constants.LOGIN_REQUEST)) {
    res.status(400).json(AppUtils.checkError(request, Constants.LOGIN_REQUEST));
    return;
  }

  try {
    request.email = request.email.toLowerCase();
    let data = await sign.findOne({ email: request.email });
    if (data) {
      let passwordMatch = await bcrypt.compare(request.password, data.password);
      if (passwordMatch) {
        const successResponse = AppUtils.generateSuccess(
          "AUTHORISED",
          "Successfully Logged In"
        );
        successResponse.user = {
          email: data.email,
          name: data.name,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
        successResponse.token = jwt.sign(
          { email: data.email },
          Constants.SECRET_KEY
        );
        data.token = successResponse.token;
        data.save();
        res.json(successResponse);
        return;
      } else {
        res
          .status(401)
          .json(AppUtils.generateError("UNAUTHORIZED", "Invalid Credentials"));
        return;
      }
    } else {
      res
        .status(404)
        .json(
          AppUtils.generateError(
            "USER_NOT_FOUND",
            `No user found with ${request.email}`
          )
        );
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(AppUtils.generateError(err.code, err.message));
  }
});


module.exports=loginRouter;