FROM node:16.14.0

RUN mkdir -p /home/app
WORKDIR /home/app
VOLUME .:/home/app

COPY package*.json yarn.lock ./
COPY prisma ./prisma/
RUN yarn

COPY . .
RUN yarn run build:prod

ENV PORT 3001
EXPOSE $PORT

CMD yarn run start:prod; yarn run db:migrate; yarn run db:seed
