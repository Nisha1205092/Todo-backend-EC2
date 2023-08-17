#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.5.1/bin

cd todo-backend-2
git pull origin master
cd server
pm2 kill
pm2 start index.js
