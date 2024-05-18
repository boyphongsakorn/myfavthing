#Use and existing docker image as a base
FROM node:lts-alpine
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node","start"]