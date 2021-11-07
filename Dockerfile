FROM node:17-alpine3.12

WORKDIR /code
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "chat_api/app.js"]