#!/bin/bash

echo "Install git"
sudo apt-get install git

echo "Install nodejs"
sudo apt-get install nodejs
sudo apt-get install nodejs-legacy
sudo ln -s /usr/bin/nodejs /usr/bin/node

echo "Install npm"
sudo apt-get install npm

echo "Install bower"
sudo npm install bower -g
