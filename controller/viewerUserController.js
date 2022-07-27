const mongoose = require("mongoose");
var viewer = mongoose.model("ViewerTable");
const jwt = require("jsonwebtoken");

const addViewer = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { name, age, email } = req.body;

    // Validate user input
    if (!(email && name && age)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await viewer.findOne({ email: email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Create user in our database
    const user = await viewer.create({
      name,
      age,
      email: email.toLowerCase(),
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "30h",
      }
    );
    // save user token
    user.token = token;
    // return new user
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

const fetchViewer = async (req, res) => {
  try {
    const fetch = await viewer.find();
    res.json(fetch);
  } catch (err) {
    res.send("Error", +err);
  }
};

const loginViewer = async (req, res) => {
  const { name } = req.body;
  res.send(`Hello ${name}`);
};

exports.addViewer = addViewer;
exports.fetchViewer = fetchViewer;
exports.loginViewer = loginViewer;
