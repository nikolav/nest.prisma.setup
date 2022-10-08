#!/bin/bash

sleep 1

yarn install
yarn run build:prod
docker-compose up -d --build
docker exec -it nestapi_app000 yarn run db:migrate
docker exec -it nestapi_app000 yarn run db:seed
