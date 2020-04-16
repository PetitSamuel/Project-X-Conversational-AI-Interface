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


## API
Here's a brief description on our API endpoints. First of all, all of our endpoints are defined in the router.js file in the server directory. It defines a list of endpoints and what function to map it to.

#### POST Requests
##### /api/intents
Required body parameters (in JSON format):
```
{
    name: String,
    synonyms: Array of: {
        synonym_reference: String,
        list: String array
    }
}
```
If one of the parameters is not present or an instance of a synonym object is does not have both of the specified variables, then status code 400 will be returned and the body will look as follows:
```
{
    error: true,
    message: <reason for 400 status>
}
```

On success, a response such as the following will be sent;
```
{
    "_id": "5e7cc9d3cebcc70008da1d46",
    "name": "test_name",
    "synonyms": [
        {
            "list": [
                "first item",
                "second item"
            ],
            "_id": "5e7cc9d3cebcc70008da1d47",
            "synonym_reference": "reference 1"
        }
    ],
    "date": "2020-03-26T15:27:15.507Z",
    "__v": 0
}
```
Note that names are unique and thus if a request is received for a name that doesn't exists, then an intent of that name will be created with the synonyms specified in that requests. If an intent name already exists and a post requests is received for that intent, the list of synonyms for that intent will be overwritten with the ones received in the request. Thus this endpoint can also be used to delete a single or multiple synonyms from an intent.

##### /api/entities
Required body parameters (in JSON format):
```
{
    name: String,
    expressions: String array
}
```
If one of the parameters is not present or expressions is not an array then status code 400 will be returned and the body will look as follows:
```
{
    error: true,
    message: <reason for 400 status>
}
```

On success, a response such as the following will be sent;
```
{
    "expressions": [
        "hello"
    ],
    "_id": "5e7cc18f5c14b30009de5865",
    "name": "test_name",
    "__v": 0
}
```
Note that names are unique and thus if a request is received for a name that doesn't exists, then an entity of that name will be created with the expressions specified in that requests. If an entity name already exists and a post requests is received for that entity, the list of expressions for that entity will be overwritten with the ones received in the request. Thus this endpoint can also be used to delete a single or multiple expressions from an entity.

##### /api/intents-generation
This endpoint does not require a body. It is also not used in the frontent, its sole purpose was to generate intents in our database for testing purposes while developping.
The response will have the following structure:
```
{
    "message": "populated db with intents"
}
```

The database will then contain 100 uniquely generated intents, with dates ranging from 7 days ago until now. This can be checked using the GET intents endpoint specified below.

##### /api/entities-generation
Similarly to the above endpoint, it does not require a body. It is also not used in the frontent, its sole purpose was to generate entities in our database for testing purposes while developping.
The response will have the following structure:
```
{
    "message": "populated db with entities"
}
```

The database will then contain 100 uniquely generated entities, with dates ranging from 7 days ago until now. This can be checked using the GET entities endpoint specified below.

##### /api/upload-csv
This endpoint handles CSV file upload. It requires the following structure:
```
{
    file: <csv file contents>
}
```
The server will save the file locally (renamed using the current time such as to make files unique and avoid overwritting already existing files) in the "uploaded_files" directory. It will then attempt to read the file contents and convert it to a markdown file. On success the response will be as such:

```
{
    filename: <output markdown file name> 
}
```

The filename returned is the file name to request a download of in order to download the generated markdown file to the client. See the details for endpoint GET /api/download-md/<filename>
.
#### GET Requests
##### /api/intents
GET Requests don't allow for a body.
This method returns a list of all of the intents currently stored in the database.
Response structure: an array of intents structured objects.
```
[
    {
        "_id": "5e7cc9d3cebcc70008da1d46",
        "name": "test_name",
        "synonyms": [
            {
                "list": [
                    "first item",
                    "second item"
                ],
                "_id": "5e7cc9d3cebcc70008da1d47",
                "synonym_reference": "reference 1"
            },
            {
                "list": [
                    "third item",
                    "fourth item"
                ],
                "_id": "5e7cc9d3cebcc70008da1d48",
                "synonym_reference": "reference 2"
            }
        ],
        "date": "2020-03-26T15:27:15.507Z",
        "__v": 0
    }
]
```

##### /api/intents/<intent_name>
GET Requests don't allow for a body.
This method returns an instance of a specific intent (the one specified in the endpoint).
Response structure: an array of 1 or 0 intent structured object.
For /api/intents/test
```
[
    {
        "expressions": [
            "test",
            "same",
            "hey"
        ],
        "_id": "5e7c9e7fbbad2f0008825fda",
        "name": "test",
        "__v": 2
    }
]
```

If no intent named "test" is found in the database:
```
[]
```

##### /api/entities
GET Requests don't allow for a body.
This method returns a list of all of the entities currently stored in the database.
Response structure: an array of entities structured objects.
```
[
    {
        "expressions": [
            "test",
            "same",
            "hey"
        ],
        "_id": "5e7c9e7fbbad2f0008825fda",
        "name": "sam",
        "__v": 2
    }
]
```

##### /api//entities/<entity_name>
GET Requests don't allow for a body.
This method returns an instance of a specific entity (the one specified in the endpoint).
Response structure: an array of 1 or 0 entity structured object.
For /api/entities/test
```
[
    {
        "expressions": [
            "test",
            "same",
            "hey"
        ],
        "_id": "5e7c9e7fbbad2f0008825fda",
        "name": "test",
        "__v": 2
    }
]
```

If no entity named "test" is found in the database:
```
[]
```

##### /api/intents-analytics
GET Requests don't allow for a body.
This endpoint is used to get an overview of the amounts of different intents that are being worked on. It returns a list with the amounts of changes that were made on intents for every hour over the last week. 

Response example:
```
[
    {
        "name": "Monday",
        "value": 0,
        "count": 2
    },
    {
        "name": "Monday",
        "value": 3,
        "count": 1
    },
    {
        "name": "Monday",
        "value": 4,
        "count": 1
    },
    .........,
    {
        "name": "Sunday",
        "value": 23,
        "count": 1
    }
]
```
Note: the response was cut as it will contain an entry for every hour over the last week which contains at least 1 change. The response was formatted in this was such as to make frontend implementation as easy as possible.

##### /api/entities-analytics
Exactly the same as /api/intents-analytics but for entities, for details look above this paragraph.

##### /api/download-md/<filename>
Triggers a file download for the specified filename. 
This is used in the CSV to Markdown conversion flow. A user would upload a file to the server which will then convert it to markdown (for details see the /api/upload-csv POST Request).
That POST requests returns a filename of the markdown file that the user should download.

#### DELETE Requests
##### /api/intents/<intent_name>
DELETE requests doesn't allow for a body.
Deletes the specified intent from the database. If not name is specified in the endpoint, the following error message will be received, and the request status will be 400.

```
{
    "error": true,
    "message": "Intent name be specified in the endpoint."
}
```
On deletion success, the following values are returned from the server, and the request status is then set to 200.

```
{
    "deleted_count": 0,
    "db_ok": true
}
```

deleted_count shows the amount of entities removed from the database (is either 0 or 1). 0 signifies that no intent with that name was removed, 1 shows that a single intent was deleted from the database.

##### /api/entities/<entity_name>
DELETE requests doesn't allow for a body.
Deletes the specified entity from the database. If not name is specified in the endpoint, the following error message will be received, and the request status will be 400.

```
{
    "error": true,
    "message": "Invalid request: no parameter specified in endpoint."
}
```
On deletion success, the following values are returned from the server, and the request status is then set to 200.

```
{
    "deleted_count": 0,
    "db_ok": true
}
```

deleted_count shows the amount of entities removed from the database (is either 0 or 1). 0 signifies that no entity with that name was removed, 1 shows that a single entity was deleted from the database.

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