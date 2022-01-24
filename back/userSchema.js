const mongoose = require("mongoose");

const user = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("User", user);
