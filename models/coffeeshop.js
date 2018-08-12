var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var coffeeshopSchema = Schema({
  name: String,
  image: String,
  speciality: String,
  description: String,
  author: {
  	id: {
  		type: Schema.Types.ObjectId,
  		ref: "User"
  	},
  	username: String
  },
  comments: [
  	{
  		type: Schema.Types.ObjectId,
  		ref: "Comment"
  	}
  ]

});

module.exports = mongoose.model("Coffeeshop", coffeeshopSchema);
