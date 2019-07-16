#!/usr/bin/env bash

DIR=$(dirname "$0")

#export GIT_COMMIT_REDIS=$(git log -1 --pretty=%h ${DIR}/redis)
#export GIT_COMMIT_FLASK=$(git log -1 --pretty=%h ${DIR}/flask)

# default the architecture to ""
if [ -z $ARCH ];
then
    export ARCH=""
fi

# default production mode to false
if [ -z $PRODUCTION ]
then
    export PRODUCTION="false"
fi

docker-compose -f $DIR/tests.yml down
docker-compose -f $DIR/tests.yml up --build --abort-on-container-exit --exit-code-from flask "$@"


