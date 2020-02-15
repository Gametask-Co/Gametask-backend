# Gametask API

API da plataforma Gametask

## Version

    Node.js v12.13.1

## Install

    yarn

## Run App

    yarn dev

# Endpoints

## Create User

### Request

`POST /user/`

```json
{
    "name": "Joaozinho",
    "email": "test@gametask.com",
    "password_hash": "test123"
}
```

### Response

```json
{
    "user": {
        "_id": "5e4795dc828a0b3d24ce05b4",
        "name": "Joaozinho",
        "email": "test@gametask.com",
        "createdAt": "2020-02-15T06:55:24.258Z"
    },
    "token": "xxxxxxxxxxxxxxx"
}
```

## Authorization - Get Token

### Request

`POST /user/auth`

```json
{
    "email": "test@gametask.com",
    "password_hash": "test123"
}
```

### Response

```json
{
    "user": {
        "_id": "5e4785c0bad8242467d23ec0",
        "name": "Joaozinho",
        "email": "test@gametask.com",
        "createdAt": "2020-02-15T05:46:40.076Z"
    },
    "token": "xxxxxxxxxxxxxxxxx"
}
```
