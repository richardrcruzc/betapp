const mongoose = require("mongoose");

const schema = mongoose.Schema({
  Id: String,
  Sport_key: String,
  Sport_title: String,
  Commence_time: String,
  Home_team: String,
  Away_team: String,
  Bookmakers: String,
});
module.exports = mongoose.model("newtodaygames", schema);
