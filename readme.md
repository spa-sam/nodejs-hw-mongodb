# Contacts API

## Використання

API буде доступне за адресою `http://localhost:3000` (або на іншому порту, який ви вказали у файлі .env).

## API Ендпоінти

### GET /contacts

Отримати список контактів з опціональною фільтрацією, сортуванням та пагінацією.

### POST /contacts

Створити новий контакт.

### GET /contacts/:contactId

Отримати конкретний контакт за ID.

### PATCH /contacts/:contactId

Оновити конкретний контакт.

### DELETE /contacts/:contactId

Видалити конкретний контакт.

## Параметри запиту

- `page`: Номер сторінки (за замовчуванням: 1)
- `perPage`: Кількість елементів на сторінці (за замовчуванням: 10)
- `sortBy`: Поле для сортування (за замовчуванням: '\_id')
- `sortOrder`: Порядок сортування ('asc' або 'desc', за замовчуванням: 'asc')
- `type`: Фільтр за типом контакту ('work', 'home', або 'personal')
- `isFavourite`: Фільтр за статусом обраного ('true' або 'false')

## Приклади запитів

1. Отримати всі контакти (пагінація за замовчуванням):
   GET /contacts

2. Отримати другу сторінку з 20 контактами на сторінці:
   GET /contacts?page=2&perPage=20

3. Отримати контакти, відсортовані за ім'ям у спадаючому порядку:
   GET /contacts?sortBy=name&sortOrder=desc

4. Отримати тільки робочі контакти:
   GET /contacts?type=work

5. Отримати тільки обрані контакти:
   GET /contacts?isFavourite=true

6. Отримати особисті контакти, які не є обраними:
   GET /contacts?type=personal&isFavourite=false

7. Складний запит:
   Отримати другу сторінку обраних домашніх контактів,
   відсортованих за ім'ям у спадаючому порядку,
   з 10 контактами на сторінці:
   GET /contacts?type=home&isFavourite=false&sortBy=name&sortOrder=desc&page=1&perPage=10

8. Створити новий контакт:
   POST /contacts Content-Type: application/json
   { "name": "Іван Петренко", "phoneNumber": "0501234567", "email": "ivan@example.com", "isFavourite": false, "contactType": "work" }

9. Оновити контакт:
   PATCH /contacts/5f8d0f5b2e7f3d001f7c2a1e Content-Type: application/json
   { "name": "Марія Петренко", "isFavourite": true }

10. Видалити контакт:
    DELETE /contacts/5f8d0f5b2e7f3d001f7c2a1e
