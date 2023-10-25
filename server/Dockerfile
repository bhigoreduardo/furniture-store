FROM node:18

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" == "dev" ]; \
        then yarn; \
        else yarn install --only=production; \
        fi

COPY . .

ENV SERVER_PORT 3001

EXPOSE $SERVER_PORT