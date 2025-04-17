FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt --update-binary

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]



