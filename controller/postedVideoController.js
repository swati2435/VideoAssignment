const mongoose = require("mongoose");
const postedVideos = mongoose.model("PostedVideoTable");
const fileUpload = require("./../multer/uploadFile");
var handlebars = require("handlebars");
var fs = require("fs");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const viewer = mongoose.model("ViewerTable");

//====================================================
//file upload
const singleFileUpload = (req, res) => {
  try {
    fileUpload.upload(req, res, async function (err) {
      const postedVideo = new postedVideos({
        name: req.file.filename,
        //email:req.file.email,
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        category: req.body.category,
        creatorId: req.body.creatorId,
        file: req.file.file,
      });
      const data = await postedVideo.save();
      sendMail(data);
      if (err == null) return res.json(data);
      else return res.json("Correctly mention required fileds.");
    });
  } catch (err) {
    res.send("ERROR:", +err);
  }
};

const sendMail = async (data) => {
  let user = await viewer.find();

  var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };

  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: "swatis.indiit@gmail.com",
        pass: "kzawdvbmbqzppitd",
      },
    })
  );
  user.forEach((key) => {
    readHTMLFile(__dirname + "/../views/email.html", function (err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        VIDEO: process.env.VIDEO_PATH + data.name,
        USER: key.name,
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: "ALERT!! <swatis.indiit@gmail.com>",
        to: key.email,
        subject: "New Video Alert!!",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log("email error", error);
        } else {
          response.send({
            msg: "Email send Successfully!!",
            status: 1,
          });
        }
      });
    });
  });
};

//fetching all files
const getAllFiles = async (req, res) => {
  try {
    const files = await postedVideos.find();
    res.send(files);
  } catch (error) {
    res.send(error.message);
  }
};

//fetch single video details
const getSingleFile = async (req, res) => {
  try {
    const file = await postedVideos.findOne({ creatorId: req.body.creatorId });
    res.status(200).send(file);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const databaseDelete = async (req, res) => {
  try {
    const deletefile = await postedVideos.deleteOne({ _id: req.body.id });
    console.log(deletefile);
    res.send(deletefile);
  } catch (err) {
    res.send(err);
  }
};
//delete
const deleteVideoFromServer = async (req, res) => {
  try {
    const DIR = "data/uploadedVideos/";
    await postedVideos.deleteOne({ _id: req.body.id });

    if (!req.params.videoName) {
      console.log("No file received");
      message = "Error! in file delete.";
      return res.status(500).json("error in delete");
    } else {
      console.log("file received");
      console.log(req.params.videoName);
      try {
        fs.unlinkSync(DIR + req.params.videoName + ".mp4");
        console.log("successfully deleted ");
        return res.send("Successfully! file has been Deleted");
      } catch (err) {
        return res.status(400).send(err);
      }
    }
  } catch (err) {}
};

exports.singleFileUpload = singleFileUpload;
exports.getAllFiles = getAllFiles;
exports.getSingleFile = getSingleFile;
exports.deleteVideoFromServer = deleteVideoFromServer;
exports.databaseDelete = databaseDelete;
