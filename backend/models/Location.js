const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectID,
		ref: 'User',
		required: true,
	},
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;