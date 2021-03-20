FROM node:14.15.1-alpine

RUN apk update

WORKDIR /usr/app

COPY package.json /usr/app/

RUN yarn

COPY .env.prod /usr/app/.env
COPY .env.prod /usr/app/.env.prod

COPY . /usr/app

RUN yarn build

CMD ["yarn", "start"]

EXPOSE 3000
