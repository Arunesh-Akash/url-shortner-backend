const mongoose = require('mongoose');

const UrlSchema=new mongoose.Schema({
    originalUrl:String,
    shortUrl:String
})

module.exports=UrlSchema;