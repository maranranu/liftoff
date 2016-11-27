#!/bin/bash

echo "Install client modules"
cd public/
bower install

cd ../
echo "Install server modules"
npm install

echo "Start server"
node server.js
