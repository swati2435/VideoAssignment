"use strict";
var mongoose = require("mongoose");
//INSERT Creator user
var VideoSchema = new mongoose.Schema(
  {
    name: { type: String },
    //email:{type:String,trim:true},
    title: { type: String },
    description: { type: String },
    tags: [String],
    category: { type: String },
    creatorId: { type: Number },
    file: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostedVideoTable", VideoSchema);
