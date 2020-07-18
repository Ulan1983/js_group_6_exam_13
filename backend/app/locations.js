const express = require('express');

const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const upload = require('../multer');

const Location = require('../models/Location');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const locations = await Location.find().populate('user');

		if (!locations) {
			return res.status(404).send({error: 'Not found'});
		}

		return res.send(locations);
	} catch (e) {
		return res.status(500).send(e);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const location = await Location.findOne({_id: req.params.id}).populate('user');

		if (!location) {
			return res.status(404).send({error: 'Not found'});
		}

		return res.send(location);
	} catch (e) {
		return res.status(500).send(e);
	}
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
	try {
		const locationData = req.body;

		if (req.file) {
			locationData.image = req.file.filename;
		}

		const location = new Location({
			title: locationData.title,
			description: locationData.description,
			image: locationData.image,
			user: req.user
		});

		await location.save();

		return res.send(location);
	} catch (e) {
		return res.status(500).send(e);
	}
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
	try {
		const location = await Location.findOne({_id: req.params.id});

		if (!location) {
			return res.status(404).send({error: 'Not found'});
		}

		await location.delete({_id: req.params.id});

		return res.send({message: 'Deleted successfully'});
	} catch (e) {
		return res.status(500).send(e);
	}
});

module.exports = router;