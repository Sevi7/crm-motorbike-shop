#!/usr/bin/env sh
docker network create crm-motorbike-shop-network
docker run -d --network crm-motorbike-shop-network -v "$PWD":/dynamodb_local_db -p 8000:8000 \
    --network-alias=dynamodb --name dynamodb \
    amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb
aws dynamodb create-table --table-name Customers \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --endpoint-url http://localhost:8000 \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

