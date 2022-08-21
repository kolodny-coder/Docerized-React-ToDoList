FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "run", "start"]






