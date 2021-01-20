
FROM node:14

# Cria diretorio
WORKDIR /usr/src/app

# instala as dependencias
COPY package*.json ./

RUN npm install

# agrupa os recursos
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]