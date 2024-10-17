FROM node:14.18.2-alpine3.12
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 11001
CMD ["node", "server.js"]