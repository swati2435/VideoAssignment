"use strict";
const multer = require("multer");
var fs = require("fs");
// var dbConfig = require('./../config/database')

let dir = "data/uploadedVideos/";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
// const storage =GridFsStorage({
//   url: 'mongodb://localhost/VideoServer',
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    console.log("file.originalname", file.originalname);
    var fileExtn = file.originalname.split(".").pop(-1);
    cb(null, new Date().getTime() + "." + fileExtn);
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 50000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(webm|mp4)$/)) {
      // upload only webm and mp4 format
      return cb(new Error("Please upload a video"));
    }
    cb(undefined, true);
  },
}).single("file");

module.exports = { upload };
