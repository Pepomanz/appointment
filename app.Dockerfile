FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "run", "start:prod"]