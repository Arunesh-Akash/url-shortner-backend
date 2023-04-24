const mongoose = require("mongoose");
const express = require("express");
const SignupSchema = require("../Schema/signupRouter");
const signUp = express.Router();
const sign = mongoose.model("users", SignupSchema, "users");
const Constants = require("../Constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppUtils = require("../AppUtils");

signUp.post("/", async (req, res) => {
  const user = req.body;
  if (!AppUtils.checkError(user, Constants.USER)) {
    res.status(400).json(AppUtils.checkError(user, Constants.USER));
    return;
  }
  try {
    user.password = await AppUtils.encryptPassword(user.password);
    user.email = user.email.toLowerCase();
    user.token = jwt.sign({ email: user.email }, Constants.SECRET_KEY);
    const newUser = new sign(user);
    await newUser.save();
    res
      .status(201)
      .json(
        AppUtils.generateSuccess(
          "USER CREATED SUCCESSFULLY",
          "User created successfully"
        )
      );
  } catch (err) {
    if (err.code == "11000") {
      res
        .status(400)
        .json(
          AppUtils.generateError("USER ALREADY EXISTS", "User Already Exists")
        );
      return;
    }
    res.status(500).json(AppUtils.generateError(err.code, err.message));
  }
});

module.exports = signUp;
