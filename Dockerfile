FROM node:12-alpine AS development
WORKDIR /usr/src/nestjs-task-management
COPY ./package.json .
RUN yarn install