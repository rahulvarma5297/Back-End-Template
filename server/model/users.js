const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true[(true, "Email already exists")],
  },
  password: {
    type: String,
    required: true,
  },
});

exports.User = mongoose.model("Users", Users);
