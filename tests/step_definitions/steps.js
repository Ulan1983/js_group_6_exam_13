const { I } = inject();

Given('я залогинен как пользователь:', table => {
	I.amOnPage('/login');

	const tableData = table.parse().rawData;

	tableData.forEach(row => {
		I.fillField(row[0], row[1]);
	});

	I.click("#loginBtn");

	I.waitForText('Вы успешно вошли, user');
});

When('я нахожусь на странице добавления заведения', () => {
	I.amOnPage('/locations/new');
});

When('я заполняю поля формы добавления:', table => {
	const tableData = table.parse().rawData;

	tableData.forEach(row => {
		I.fillField(row[0], row[1]);
	});
});

When('я нажму на кнопку {string}', (btnName) => {
	I.click(btnName);
});

Then('я попадаю на страницу списка заведений', () => {
	I.amOnPage('/');
});

When('я нахожусь на странице списка заведений', () => {
	I.amOnPage('/');
});

When('я нажимаю на изображение {string}', (btnName) => {
	I.click(btnName);
});

When('я нажимаю на поле {string}', (btnName) => {
	I.click(btnName);
});

Then('я вижу текст {string}', () => {
	I.waitForText('Вы успешно добавили отзыв');
});

