FROM node:10-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

RUN npm install && npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
