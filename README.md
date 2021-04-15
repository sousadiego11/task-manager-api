# Task manager REST API

This is a REST API for creating users and tasks for that users.

## Install

    npm install

## Run the app

    npm run dev

## Set up environment variables

    create a config folder with a dev.env file to create your environment variables.

# REST API

The REST API methods are described down below.

## Get list of Things

### Request

`POST /users`

{"name":"Your name","email":"validemail@email.com","age":"yourAge", "password":"newsecret321"}

### Request

`POST /users/login`

{"email":"createdEmail@email.com", "password":"createdPassword"}

### Request

`POST /users/logout`

### Request

`POST /users/logoutAll`

### Request

`POST /tasks`

{"description": "desc", "completed": boolean}

### Request

`GET /users/me`

### Request

`GET /tasks`

