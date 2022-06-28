#!/bin/bash

# Export env vars
export $(grep -v '^#' .env | xargs)

CONTAINER_NAME="barbu-cc_nodejs"

docker exec -it ${CONTAINER_NAME} bash
