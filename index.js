//require 
const mongoose = require('mongoose');
const express= require('express')
app = express()

require("dotenv").config();
require("./config/database").connect();

port= process.env.post || 4001;
bodyParser = require('body-parser');

//modules
creator= require('./model/creatorUserModel');
viewer= require('./model/viewerUserModel');
postedVideos= require('./model/postedVideos');





//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());//only parses json request 

app.use(express.json())//to store data in json format
var path = __dirname;

app.use("/assignmentVideo/data", express.static(path + "/data"));
//routes
const routes= require('./router/route')
routes(app);

app.listen(port);
module.exports = app;
console.log("server started on :" +port);

