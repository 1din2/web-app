#!/bin/bash

#update repository
git pull
yarn
NODE_OPTIONS=--max_old_space_size=1024 yarn build
pm2 restart ./pm2.json
