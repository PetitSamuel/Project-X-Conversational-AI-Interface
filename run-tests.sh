#!/bin/sh
COMMON_ARGS="-f docker-compose-test.yml -p backend_test"

docker-compose $COMMON_ARGS run --rm test_server "$@"
# not sure how to kill automatically when tests finish, use CTRL + C for now & kill manually if they still show up with "docker container ls"