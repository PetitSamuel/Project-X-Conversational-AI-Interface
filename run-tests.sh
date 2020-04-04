#!/bin/sh
COMMON_ARGS="-f docker-compose-test.yml -p backend_test"

docker-compose $COMMON_ARGS run --rm test_server "$@"
# (todo) not sure how to kill automatically when tests finish, use CTRL + C for now 
# Make sure to kill containers afterwards with ./end-tests.sh
# See README for more details
