FROM node:23-alpine

WORKDIR /server/delete

COPY ./package.json .

RUN npm install

COPY . .

CMD ["node", "index.js"]
 