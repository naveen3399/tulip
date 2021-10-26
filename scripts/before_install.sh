#!/bin/bash
#sudo apt purge nodejs -y
#sudo apt autoremove -y
# Install curl to download latest NodeJS setup:
yum install curl -y
# Check out https://nodejs.org/ to see what is the latest LTS version.
# Download it:
#curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
#curl -sL https://deb.nodesource.com/setup_16.x
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
#(replace "12" with the current LTS major version number).
# Install NodeJS (incl. npm):
yum install nodejs -y
# Install forever:
#sudo npm install forever -g
npm install pm2 -g
