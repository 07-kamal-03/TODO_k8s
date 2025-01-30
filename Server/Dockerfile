FROM node:23-alpine

WORKDIR /server

COPY ./package.json .

RUN npm install

COPY ./index.js .

CMD ["node", "index.js"]
 