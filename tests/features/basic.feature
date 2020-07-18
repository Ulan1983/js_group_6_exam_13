#language:ru

Функционал: Добавление заведения
  Как пользователь
  Я хочу иметь возможность добавлять заведения

  @addLocation
  Сценарий:
    Допустим я залогинен как пользователь:
      | username | user   |
      | password | 123456 |
    И я нахожусь на странице добавления заведения
    И я заполняю поля формы добавления:
      | title        | frunze |
      | description      | awesome restaurant            |
    И я нажму на кнопку "Вы соглашаетесь с нашими правилами"
    Если я нажму на кнопку "Создать"
    То я попадаю на страницу списка заведений
