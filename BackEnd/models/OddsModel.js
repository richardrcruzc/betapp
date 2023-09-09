const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: String,
  sport_key: String,
  sport_title: String,
  commence_time: String,
  home_team: String,
  away_team: String,
  bookmakers: [],
});
module.exports = mongoose.model("Odds", schema);
