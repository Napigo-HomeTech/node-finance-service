#!/usr/bin/env bash

CMD=$1
serviceName=$SERVICE_NAME

if [ "${CMD}" = 'up' ]; then
    echo "Seeding up for ${serviceName}... "
    npm run mig:up
elif [ "${CMD}" = 'down' ]; then
    echo "Seeding down for ${serviceName}... "
    npm run mig:down
done