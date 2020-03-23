FROM node:12.6.0
ADD . /server
WORKDIR /server
# COPY . /server
RUN npm install 

## LIFE SAVER SCRIPT - waits for mongoose to be fully up & running
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && node server.js
