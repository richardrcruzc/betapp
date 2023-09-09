const mongoose = require("mongoose");

const schema = mongoose.Schema({
  success: String,
  data: [],
});
module.exports = mongoose.model("Oddsv3", schema);
