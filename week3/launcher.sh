#!/bin/bash
fuser -k 3000/tcp

service redis_6379 start
cd ./oj-server
npm install
nodemon server.js &
cd ../oj-client
npm install
ng build --watch

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

####### if pressed any key, stop the process and stop redis
fuser -k 3000/tcp
service redis_6379 stop
