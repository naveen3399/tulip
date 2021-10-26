#!/bin/bash

mkdir -p /root/codepipeline/Tulip_repository/ 
cd /root/codepipeline/Tulip_repository/
npm cache verify
npm cache clean --force
npm install
#sudo npm run dev
#sudo pm2 restart tulip-service
pm2 start "npm run dev" --name tulip-service
