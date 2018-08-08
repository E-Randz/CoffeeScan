var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var coffeeshopSchema = Schema({
  name: String,
  image: String,
  description: String,
  comments: [
  	{
  		type: Schema.Types.ObjectId,
  		ref: "Comment"
  	}
  ]
});

module.exports = mongoose.model("Coffeeshop", coffeeshopSchema);
