# Gametask API

API da plataforma Gametask

## Version

    Node.js v13.14.0

## Install

    yarn

## Run App in development

    yarn dev:server

# Endpoints

# User

## Create User

### Request

`POST /user/`

```json
{
    "name": "Joaozinho da Silva",
    "email": "joaozinho@gametask.com",
    "birthday": "10/11/1995",
    "gender": "male",
    "avatar_url": null,
    "password": "test123"
}
```

### Response

```json
{
  "id": "72596f76-d36d-477a-a801-b2027f20f76b",
  "name": "Joazinho da Silva",
  "email": "joaozinho@gametask.com",
  "birthday": "1995-10-11T03:00:00.000Z",
  "gender": "male",
  "avatar_url": null,
  "created_at": "2020-10-13T02:31:55.283Z",
  "updated_at": "2020-10-13T02:31:55.283Z"
}
```

## List User

### Request

`GET /user/`

- Authentication: Bearer *****


### Response

```json
{
  "id": "72596f76-d36d-477a-a801-b2027f20f76b",
  "name": "Joazinho da Silva",
  "email": "joaozinho@gametask.com",
  "birthday": "1995-10-11T03:00:00.000Z",
  "gender": "male",
  "avatar_url": null,
  "created_at": "2020-10-13T02:31:55.283Z",
  "updated_at": "2020-10-13T02:31:55.283Z"
}
```

## Delete User

### Request

`DELETE /user/`

- Authentication: Bearer *****


### Response

```json
{
  "message": "ok"
}
```

## Authorization - Authenticating

### Request

`POST /session`

```json
{
    "email": "joaozinho@gametask.com",
    "password_hash": "test123"
}
```

### Response

```json
{
  "id": "72596f76-d36d-477a-a801-b2027f20f76b",
  "name": "Joazinho da Silva",
  "email": "joaozinho@gametask.com",
  "birthday": "1995-10-11T03:00:00.000Z",
  "gender": "male",
  "avatar_url": null,
  "created_at": "2020-10-13T02:31:55.283Z",
  "updated_at": "2020-10-13T02:31:55.283Z",
  "token": "******"
}
```
