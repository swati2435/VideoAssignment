const mongoose = require("mongoose");
var creator = mongoose.model("CreatorTable");
const jwt = require("jsonwebtoken");

const addCreator = async (req, res) => {
  try {
    // Get user input
    const { name, creatorId, age, email } = req.body;

    // Validate user input
    if (!(email && name && age && creatorId)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await creator.findOne({ creatorId: creatorId });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Create user in our database
    const user = await creator.create({
      name,
      age,
      creatorId,
      email: email.toLowerCase(),
    });

    // Create token
    const token = jwt.sign(
      { creatorId: user.creatorId, email },
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

const fetchCreator = async (req, res) => {
  try {
    const fetch = await creator.find();
    res.json(fetch);
  } catch (err) {
    res.send("Error", +err);
  }
};

const loginCreator = async (req, res) => {
  res.send("hello Creator");
};

exports.addCreator = addCreator;
exports.fetchCreator = fetchCreator;
exports.loginCreator = loginCreator;
