FROM node:16.14.0

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package*.json yarn.lock ./
COPY prisma ./prisma/
RUN yarn

COPY . .
RUN yarn run build:prod

ENV PORT 3001
EXPOSE $PORT

VOLUME .:/home/app

CMD ["yarn", "run", "start:prod"]
