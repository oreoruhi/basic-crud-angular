var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

var BearSchema	= new Schema({

	student_id: Number,
	firstname: String,
	lastname: String,
	info: String

});

module.exports = mongoose.model('Bear', BearSchema);
