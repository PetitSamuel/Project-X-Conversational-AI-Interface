# CSU33013
Repo for Trinity College Dublin's Software engineering group project module 

## How to use with docker : 
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

If you make changes to any of ./training-interface/Dockerfile or ./server/Dockerfile, you will want to rebuild the images, you can do so simply with the command:
```
docker-compose build
```

The environent injects variables from the .env file into different services, for example, the following variables control the directories in which data for the databases will be stored locally in this dir as well as in the container.

```
DATABASE_DATA=./db
TEST_DATABASE_DATA=./testdb
```

## API
TODO(@Sam) : add details about the api here
## Database
This system uses Mongodb run within a docker container. Once the container is running you can connect locally from the command line using the following command : 
```
mongo --port 27017 -u "user" -p "password" --authenticationDatabase "db"
```
This will log you in as a normal user with read write access.

If you need admin access then use the following : 

```
mongo --port 27017 -u "root" -p "root" --authenticationDatabase "db"
```

To note : 
- These users are create when the database is initialised. The initialisation script is in the root directory : "init-db.js".
- The docker image for mongo takes image user and password parameters as environment variables. I'm not quite sure if these are overwritten by our database initialisation script. Just in case, if you want to change passwords for database users, make sure to update the .env file as well as "init-db.js" and make sure that users and passwords match.

To reset the database simply delete the database directory, in this case we have the following env variables:

```
DATABASE_DATA=./db
TEST_DATABASE_DATA=./testdb
```

Thus we can delete the config and data for the different databases with:
```
// dev database
sudo rm -rf db

// testing database
sudo rm -rf testdb
```

Make sure to not have the containers running while you do this. If in doubt kill all running containers with the end of tests script (read below for details):
```
./end-tests.sh
```

## Testing the backend:
To run backend tests, simply execute the **run-tests** script. It will run the testing docker setup which creates a testing image for the server and runs the services that it depends on.

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
- The tests will run the coverage by default as well. The code base is not very big thus it doesn't change the run time much, if you do however only want to run tests without coverage then change the /server/Dockerfile.test file's following line:
```
// Change :
CMD /wait && npm run test-with-coverage
// to
CMD /wait && npm test

```

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

### Rebuilding the testing image
Finally, if you make changes to the Dockerfile.test file you will want to rebuild it, you can do so manually by specifying in the command line the docker compose file to use and the service name. Or you could not worry about these and simply remove the image then the script again:

```
docker image ls 

// output:
REPOSITORY               TAG     IMAGE ID      CREATED              SIZE
backend_test_test_server latest  d6525cf3d594  About a minute ago   980MB

// remove the image
docker rmi d6525cf3d594

// rebuild the image
./run-tests.sh
```