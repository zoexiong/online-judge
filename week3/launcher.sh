#!/bin/bash
fuser -k 3000/tcp
fuser -k 5000/tcp

src/redis-server
cd ./oj-server
sudo npm install
nodemon server.js &
cd ../oj-client
sudo npm install
ng build --watch &
cd ../executor
sudo pip install -r requirements.txt
python executor_server.py &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

####### if pressed any key, stop the process and stop redis
fuser -k 3000/tcp
fuser -k 5000/tcp
service redis_6379 stop