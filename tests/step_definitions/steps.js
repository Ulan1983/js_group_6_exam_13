const { I } = inject();

Given('я нахожусь на странице логина', () => {
	I.amOnPage('/login');
});

When('я заполняю поля формы:', table => {
	const tableData = table.parse().rawData;

	tableData.forEach(row => {
		I.fillField(row[0], row[1]);
	});
});

When('нажимаю на кнопку {string}', btnName => {
	I.click(btnName);
});

Then('я вижу текст {string}', () => {
	I.waitForText('Вы успешно вошли, user');
});
