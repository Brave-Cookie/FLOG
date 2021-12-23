###!/bin/bash

cd /srv/FLOG/
git pull origin master

cd /srv/FLOG/backend/
docker stop express_con
docker rm express_con
docker run -d --name express_con -p 3000:3000 -v ${PWD}:/myfolder/ express_img

cd /srv/FLOG/backend_flask/
docker stop flask_con
docker rm flask_con
docker run -d --name flask_con -p 5000:5000 -v ${PWD}:/myfolder/ flask_img
