#!/bin/bash
sudo apt-get update
sudo apt install npm
sudo apt install ng-common
sudo apt install python-pip
sudo pip install flask
sudo npm install -g nodemon

sudo apt install redis-tools
wget http://download.redis.io/releases/redis-4.0.1.tar.gz
tar xzf redis-4.0.1.tar.gz
cd redis-4.0.1
make