FROM node as build

# create app directory
WORKDIR /app

# copy package.json first to leverage Docker cache
COPY package.json .

# install dependencies
RUN npm install

# copy app source
COPY . .

RUN npm run build

FROM node:alpine

COPY --from=build /app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

CMD [ "node", "dist/main.js" ]