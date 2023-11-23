FROM node:19-alpine
WORKDIR /frontend
COPY package*.json ./
RUN npm i --silent
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]