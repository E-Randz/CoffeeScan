var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = Schema({
	text: String,
	author: String
});

module.exports = mongoose.model("Comment", commentSchema);