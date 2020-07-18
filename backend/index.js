const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./app/users');
const locations = require('./app/locations');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
	await mongoose.connect(config.database, config.databaseOptions);

	app.use('/users', users);
	app.use('/locations', locations);

	app.listen(config.port, () => {
		console.log(`HTTP server started on ${config.port} port...`);
	})
};

run().catch(e => {
	console.error(e)
});