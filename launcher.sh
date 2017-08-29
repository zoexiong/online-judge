#!/bin/bash
fuser -k 3000/tcp
fuser -k 5000/tcp
# fuser -k 6379/tcp

# sudo service redis_6379 start
# cd ../redis-4.0.1/
# src/redis-server
# cd ../online-judge
cd ./oj-server
sudo npm install
nodemon server.js &
cd ../oj-client
sudo npm install
ng build --watch &
cd ../executor
sudo pip install -r requirements.txt
sudo python executor_server.py 5000 &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

####### if pressed any key, stop the process and stop redis
fuser -k 3000/tcp
fuser -k 5000/tcp
redis-cli shutdown
#sudo service redis_6379 stop