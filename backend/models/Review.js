const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
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
	comment: {
		type: String,
		required: true
	},
	foodRating: {
		type: Number,
	},
	serviceRating: {
		type: Number
	},
	interiorRating: {
		type: Number
	},
	date: {
		type: Date,
		default: Date.now,
	}
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;