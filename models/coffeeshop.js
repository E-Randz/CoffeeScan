var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var coffeeshopSchema = Schema({
  name: String,
  image: String,
  description: String
});

module.exports = mongoose.model("Coffeeshop", coffeeshopSchema);
