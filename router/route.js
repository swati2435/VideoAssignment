module.exports = function (app) {
  var postedVideo = require("./../controller/postedVideoController");
  var creatorUser = require("./../controller/creatorUserController");
  var viewerUser = require("./../controller/viewerUserController");
  var auth = require("./../middleware/auth");

  app.route("/uploadVideo").post(postedVideo.singleFileUpload);
  app.route("/deleteFile").delete(postedVideo.databaseDelete);
  app.route("/fetchVideos").post(postedVideo.getAllFiles);
  app.route("/fetchSingleFile").post(postedVideo.getSingleFile);
  app.route("/deleteServerFile").delete(postedVideo.deleteVideoFromServer);
  //Creator
  app.route("/addCreator").post(creatorUser.addCreator);
  app.route("/fetchCreator").get(creatorUser.fetchCreator);
  app.route("/loginCreator").get(auth.verifyToken, creatorUser.loginCreator);

  //VIEWER
  app.route("/addViewer").post(viewerUser.addViewer);
  app.route("/fetchViewer").get(viewerUser.fetchViewer);
  app.route("/loginViewer").get(auth.verifyToken, viewerUser.loginViewer);
};
