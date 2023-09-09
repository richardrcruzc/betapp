const mongoose = require("mongoose");

const schema = mongoose.Schema({
  selectedMatches: [],
  betAmount: String,
  win: String,
  time: String,
  userId: String,
});
module.exports = mongoose.model("betlist", schema);
