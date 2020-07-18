const express = require('express');

const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');

const Review = require('../models/Review');
const Location = require('../models/Location');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const reviews = await Review.find().populate('location').populate('user');

		if (!reviews) {
			return res.status(404).send({error: 'Not found'});
		}

		return res.send(reviews);
	} catch (e) {
		return res.status(500).send(e);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const review = await Review.findOne({_id: req.params.id});

		if (!review) {
			return res.status(404).send({error: 'Not found'});
		}

		return res.send(review);
	} catch (e) {
		return res.status(500).send(e);
	}
});

router.post('/:id', auth, async (req, res) => {
	try {
		const reviewData = req.body;
		const location = await Location.findById(req.params.id);

		const review = new Review({
			user: req.user._id,
			location: location._id,
			comment: reviewData.comment,
			foodRating: reviewData.foodRating,
			serviceRating: reviewData.serviceRating,
			interiorRating: reviewData.interiorRating
		});

		await review.save();

		return res.send(review);
	} catch (e) {
		return res.status(500).send(e);
	}
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
	try {
		const review = await Review.findOne({_id: req.params.id});

		if (!review) {
			return res.status(404).send({error: 'Not found'});
		}

		await review.delete();

		return res.send({message: 'Deleted successfully'});
	} catch (e) {
		return res.status(500).send(e);
	}
});

module.exports = router;