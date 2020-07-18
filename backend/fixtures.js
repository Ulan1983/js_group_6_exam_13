const mongoose = require('mongoose');
const config = require("./config");
const User = require('./models/User');
const Location = require('./models/Location');

const run = async () => {
	await mongoose.connect(config.database, config.databaseOptions);

	const collection = await mongoose.connection.db.listCollections().toArray();

	for (let coll of collection) {
		await mongoose.connection.db.dropCollection(coll.name);
	}

	const [user1, user2] = await User.create({
		username: 'user',
		password: '123456',
		token: '123456',
		role: 'user',
	}, {
		username: 'admin',
		password: '123456',
		token: '123456',
		role: 'admin',
	});

	await Location.create({
		title: 'Ресторан Фрунзе',
		description: 'Один из лучших ресторанов города приглашает Вас отведать блюда азиатской и европейской кухни',
		image: 'frunze.jpg',
		user: user1
	}, {
		title: 'Ресторан Арзу-Гранд',
		description: 'Европейская, китайская, восточная, кыргызская, уйгурская, узбекская, русская, французская кухни. Сцена, танцпол, VIP-зал, зона для курящих, гримёрная, комната для молодожёнов, звуковая аппаратура, световая аппаратура, музыкальное сопровождение, видеосъёмка, ведущий (тамада), фотосъёмка, оформление зала',
		image: 'arzu.jpg',
		user: user2
	}, {
		title: 'Ресторан Барашек',
		description: 'Ресторан «Барашек» — культовое место для гурманов нашего города и гостей Бишкека. Мы собрали все самое лучшее, что может отражать истинное радушное гостеприимство: современный интерьер в сочетании дерева и зеркал, располагает к безмятежному и уютному времяпрепровождению; вкусные блюда не только из барашка, а также свежей телятины или охлажденной рыбы; внимательный сервис отличается особенным трепетом и уважением к каждому гостю.\n' +
			'Мы рады видеть Вас в ресторане «Барашек» сегодня и всегда.',
		image: 'barashek.jpg',
		user: user1
	});

	mongoose.connection.close();
};

run().catch(e => {
	throw e;
});