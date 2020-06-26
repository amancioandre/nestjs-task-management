FROM node:12
WORKDIR /usr/src/nestjs-task-management
COPY ./package.json .
RUN yarn install