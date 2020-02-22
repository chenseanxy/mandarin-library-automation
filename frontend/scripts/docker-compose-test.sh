#!/bin/bash

cd "$(dirname "$0")"

docker build .. -t libraryfrontend:test

docker-compose -f docker-compose-test.yml up \
    --abort-on-container-exit \
    --exit-code-from testrunner

docker-compose -f docker-compose-test.yml rm -f