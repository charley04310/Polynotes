FROM node as build

# create app directory
WORKDIR /app

# copy package.json first to leverage Docker cache
COPY package.json .

# install dependencies
RUN npm install

# copy app source
COPY . .

ARG REACT_APP_NAME

ENV REACT_APP_NAME=$REACT_APP_NAME
# start app
RUN npm run build


FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf