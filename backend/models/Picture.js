const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
	photo: {
		type: String
	},
	user: {
		type: Schema.Types.ObjectID,
		ref: 'User',
		required: true
	},
	location: {
		type: Schema.Types.ObjectID,
		ref: 'Location',
		required: true
	},
});

const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;