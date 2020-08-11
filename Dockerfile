FROM node:13.12.0-alpine
COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 5000

CMD ["npm", "start"]