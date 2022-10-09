#!/bin/bash

sleep 1
# update packages
apt update
apt-get update

# install NodeJS
curl -sL https://deb.nodesource.com/setup_current.x | sudo -E bash -
apt-get install -y nodejs

# install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt update
apt install yarn

# install docker
apt-get remove docker docker-engine docker.io containerd runc
apt-get update
apt-get install ca-certificates curl gnupg lsb-release
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
# if error @'apt-get update':
#   try chmod a+r /etc/apt/keyrings/docker.gpg

# install docker-compose
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# net-tools
apt install net-tools
  # ifconfig

sleep 1
# allow ports
ufw allow http
ufw allow OpenSSH
ufw allow 8081
ufw allow 5555
ufw enable

# status check
echo -n 'node: ' && node --version
echo -n 'npm: ' && npm --version
echo -n 'yarn: ' && yarn --version
docker --version
docker-compose --version
service docker status
ufw status verbose
