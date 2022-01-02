const mongoose = require("mongoose");

const todo = mongoose.Schema({
  index: Number,
  title: String,
  name: String,
  content: String,
  clear: Boolean,
});

module.exports = mongoose.model("Todo", todo);
