# User Management System
Система управления пользователями с аутентификацией и авторизацией на базе Express Node.js и MS SQL Server.

## Описание проекта
Проект представляет собой REST API сервис для управления пользователями, включающий:
* Регистрацию и авторизацию пользователей
* Управление профилями
* Систему ролей и прав доступа
* Функционал блокировки пользователей
* JWT-аутентификацию 

## Технологии и зависимости
* __Backend__: Node.js, Express.js
* __База данных__: MS SQL Server
* __Аутентификация__: JWT
* __Хэширование__: bcrypt
* __ORM__: mssql

## Установка и запуск
### 1. Клонирование репозитория
```
git clone  https://github.com/AhmedTanryverdi/node-user-management-service.git

```
### 2. Установка зависимостей
```
npm install
```
### 3. Настройка переменных окружения
```
DB_USER=your_db_user  
DB_PASSWORD=your_db_password  
DB_SERVER=your_db_server  
DATABASE=your_database_name  
DB_PORT=1433  
PORT=5500 
```
 
### 4. Запуск приложения
```
npm run dev
```
## API документация
### Регистрация пользователя
```
POST /api/register
```
#### Тело запроса:
```
{
    "id": int,
    "firstname": "string",
    "lastname": "string",
    "patronym": "string",
    "birthday": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    is_active: 0 | 1
}
```
### Авторизация
```
POST /api/login
```
#### Тело запроса:
```
{
    "email": "string",
    "password": "string"
}
```

### Получение списка пользователей
```
POST /api/users
```

### Получение информации о пользователе
```
GET /api/users/:id
```

### Блокировка пользователя
```
POST /api/users/:id/block
```

## Обработка ошибок
### Система обрабатывает следующие типы ошибок:
* Валидационные ошибки
* Ошибки авторизации
* Ошибки базы данных
* Серверные ошибки