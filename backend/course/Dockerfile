FROM node:18-alpine
RUN npm config set fetch-retries 5
RUN npm config set fetch-timeout 60000
RUN npm cache clean --force
RUN npm install -g nodemon
WORKDIR /src
COPY package.json .
RUN npm install
COPY .. .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]