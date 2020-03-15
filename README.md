# CSU33013
Repo for Trinity College Dublin's Software engineering group project module 

# How to use with docker : 
Make sure to have docker & docker composed installed. You can do so by running :
```
docker --version
docker-compose --version
```
You should get an output similar to this one : 
```
Docker version 19.03.6, build 369ce74a3c
docker-compose version 1.25.4, build 8d51620a
```

When that is done you simply need to run the following : 

```
// build the images 
docker-compose build
// run the services
docker-compose up
```

When you are done coding simply hit ctrl+c and wait for the containers to stop.
To make sure the containers are not running anymore, run:
```
docker-compose down
```

The environent injects variables from the .env file into different services, for example, to set the settings for the mariadb database, you want to change the following variables in the .env file of this directory:

```
MYSQL_ROOT_PASSWORD=password
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_DATABASE=db
```

In this case, the root user for the database uses the password "password", there is also a user with the credentials "user" "password" and the schema used is "db".


To note : most of the services are currently commented out, to enable the use of the database and / or rasa endpoint then just remove the comments from the docker-compose.yml file in this same directory.