# Task manager REST API

This is a REST API for creating users and tasks for that users.

## Install

    📌 npm install

## Run the app

    🔥 npm run dev

## Set up environment variables

    setup a config/dev.env file to create your environment variables.

# REST API

The REST API methods are described down below.

## Get list of Things

### POST Requests

`POST /users`
```
{
    "name":"Your name",
    "email":"validEmail@email.com",
    "age":"yourAge", 
    "password":"yourPassword"
}
```

`POST /users/login`

```
{
    "email":"validEmail@email.com", 
    "password":"createdPassword"
}
```

`POST /users/logout`

`POST /users/logoutAll`

`POST /tasks`

```
{
    "description": "desc", 
    "completed": boolean
}
```
### GET Requests

`GET /users/me`

`GET /tasks`

