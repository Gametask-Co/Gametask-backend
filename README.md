# Gametask API

API da plataforma Gametask

## Version

    Node.js v12.13.1

## Install

    yarn

## Run App

    yarn dev

# Endpoints

## Get list of Things

### Request

`GET /thing/`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []
