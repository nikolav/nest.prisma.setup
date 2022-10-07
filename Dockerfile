FROM node:16.14.0
RUN mkdir -p /home/app
WORKDIR /home/app
COPY package*.json yarn.lock ./
COPY prisma ./prisma/
RUN yarn install --production --frozen-lockfile
COPY . .
RUN yarn run build
VOLUME .:/home/app
ENV PORT 3001
EXPOSE $PORT
CMD ["yarn", "run", "start:prod"]
