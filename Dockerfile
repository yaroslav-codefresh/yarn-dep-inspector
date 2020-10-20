FROM node:12-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

ENTRYPOINT [ "node", "index.js" ]
