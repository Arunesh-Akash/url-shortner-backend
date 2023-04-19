const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const urlRouter = require("./router");
mongoose.connect("mongodb://127.0.0.1/url_shortner");

app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());
app.use("/url", urlRouter);

app.listen(4000, () => {
  console.log("Server is listening on 4000");
});
