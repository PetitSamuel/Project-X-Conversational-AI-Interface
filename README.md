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

# Database
This system uses Mongodb as a docker container. Once the container is running you can connect locally from the command line using the following command : 
```
mongo --port 27017 -u "user" -p "password" --authenticationDatabase "db"
```
This will log you in as a normal user with read write access.

If you need admin access then use the following : 

```
mongo --port 27017 -u "root" -p "root" --authenticationDatabase "db"
```

To note : these users are create when the database is initialised. The initialisation script is in the root directory : "init-db.js".

# Testing the backend:
To run backend tests, simply execute the "run-tests.sh" script. It will run the testing docker setup which creates a testing image for the server and runs the services that it depends on.

In linux:
```
// You may need to make the script executable
chmod +x run-tests.sh

// run the tests
./run-tests.sh
```

TO NOTE:
- I didn't find how to automatically kill the containers when tests end. As a result of this, when the tests are done hit ctrl + c.
- You're going to want to stop any remaining containers that are running (don't skip this step!) 

To stop all running containers (recommended):
```
// You may need to make the script executable
chmod +x end-tests.sh

// run the tests
./end-tests.sh
```
When this command ends you're done!

The other options, if you have other containers running from a different project you don't want to kill, then simply:

```
docker container ls
docker stop <NAME>

// for example in my case:
docker stop backend_test_db_1
```
