const path = require('path');
const rootPath = __dirname;

const env = process.env.NODE_ENV;

let database = 'mongodb://localhost/exam_13';
let port = 8000;

if (env === 'test') {
	database = 'mongodb://localhost/exam_13-test';
	port = 8010;
}

module.exports = {
	rootPath,
	userAvatar: path.join(rootPath, 'public/uploads/userAvatar'),
	locationImage: path.join(rootPath, 'public/uploads/locationImage'),
	photoGallery: path.join(rootPath, 'public/uploads/photoGallery'),
	database,
	databaseOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	},
	port,
};