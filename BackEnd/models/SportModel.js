const mongoose = require("mongoose");

const schema = mongoose.Schema({
  sports: String,
  data: [],
});
module.exports = mongoose.model("sports", schema);
