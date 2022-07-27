"use strict";
var mongoose = require("mongoose");

var CreatorSchema = new mongoose.Schema(
  {
    name: { type: String },
    creatorId: { type: Number },
    age: { type: Number },
    email: { type: String, trim: true },
    token: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CreatorTable", CreatorSchema);
