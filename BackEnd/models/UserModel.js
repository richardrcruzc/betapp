const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: String,
});
module.exports = mongoose.model("User", schema);
