#!/bin/bash

# Export env vars
export $(grep -v '^#' .env | xargs)

CONTAINER_NAME="barbu-cc_nodejs"

docker exec -it --workdir /var/www/html/cms ${CONTAINER_NAME} bash
