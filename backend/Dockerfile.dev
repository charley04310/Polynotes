FROM node as dev

# create app directory
WORKDIR /app

# copy package.json first to leverage Docker cache
COPY package.json ./

# install dependencies
RUN npm install

# copy app source
COPY . .

RUN npm run build