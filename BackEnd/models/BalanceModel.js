const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: String,
  userId: String,
  betAmount: String,
});
module.exports = mongoose.model("Balance", schema);
