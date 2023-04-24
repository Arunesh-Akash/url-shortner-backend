const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const urlRouter = express.Router();
const UrlSchema = require("../Schema/urlSchema");
const AppUtils = require("./AppUtils");
const Url = mongoose.model("url", UrlSchema, "url");

urlRouter.post("/", async (req, res) => {
  const original_url = req.body.originalUrl;
  if (!original_url) {
    res.status(404).json(AppUtils.generateFieldError(original_url));
    return;
  }
  try {
    const data = new Url({
      originalUrl: original_url,
      shortUrl: shortid.generate(),
    });
    await data.save();
    res.status(200).json(AppUtils.generateSuccess("SUCCESS", "Successfully"));
  } catch (err) {
    res.status(500).json(AppUtils.generateError(err.code, err.message));
  }
});

urlRouter.get('/',async (req,res)=>{
  const url_data =req.query.shortUrl;
  if(!url_data){
    res.status(404).json(AppUtils.generateFieldError(url_data));
  }
  try{
    const url= await Url.findOne({shortUrl:url_data});
    if(url){
      res.status(200).json(AppUtils.generateSuccess("SUCCESSFULLY RENDER","Successfully Render")).redirect(url.originalUrl);
      console.log("Successfully render");
    } 
    else{
      res.status(404).json(AppUtils.generateError("PAGE NOT FOUND","Page not found"));
    }
  }
  catch(err){
    res.status(500).json(AppUtils.generateError(err.code,err.message));
  }
})

module.exports = urlRouter;
