const express = require('express');

const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const upload = require('../multer');

const Location = require('../models/Location');
const Picture = require('../models/Picture');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const pictures = await Picture.find().populate('user').populate('location');

		if (!pictures) {
			return res.status(404).send({error: 'Not found'});
		}

		return res.send(pictures);
	} catch (e) {
		return res.status(500).send(e);
	}
});

router.post('/:id', [auth, upload.single('photo')], async (req, res) => {
	try {
		const pictureData = req.body;
		const location = await Location.findById(req.params.id);

		if (req.file) {
			pictureData.photo = req.file.filename;
		}

		const picture = new Picture({
			photo: pictureData.photo,
			user: req.user._id,
			location: location._id,
		});

		await picture.save();

		return res.send(picture);
	} catch (e) {
		return res.status(500).send(e);
	}
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
	try {
		const picture = await Picture.findOne({_id: req.params.id});

		if (!picture) {
			return res.status(404).send({error: 'Not found'});
		}

		await picture.delete();

		return res.send({message: 'Deleted successfully'});
	} catch (e) {
		return res.status(500).send(e);
	}
});

module.exports = router;