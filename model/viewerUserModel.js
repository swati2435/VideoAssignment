"use strict";
var mongoose = require("mongoose");

var ViewerSchema = new mongoose.Schema(
  {
    name: { type: String },
    age: { type: Number },
    email: { type: String, trim: true },
    token: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ViewerTable", ViewerSchema);
