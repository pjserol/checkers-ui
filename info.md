# Checkers client

## Start

```sh
cd client

npm install protobufjs@7.0.0 --save-exact
npm install @cosmjs/stargate@0.28.11 --save-exact

npm install mocha@10.0.0 @types/mocha@9.1.1 \
    chai@4.3.6 @types/chai@4.3.3 \
    ts-node@10.9.1 @types/node@18.7.5 \
    dotenv@16.0.1 @types/dotenv@8.2.0 \
    --save-dev --save-exact
```

## Use existing checkers docker image

```sh
curl -O https://raw.githubusercontent.com/cosmos/b9-checkers-academy-draft/main/Dockerfile-standalone

docker build . \
    -f Dockerfile-standalone \
    -t checkersd_i:standalone

docker network create checkers-net

docker run --rm -it \
    -p 26657:26657 \
    --name checkers \
    --network checkers-net \
    checkersd_i:standalone start

docker stop checkers
docker network rm checkers-net

# Launc test with docker

docker run --rm \
    -v $(pwd):/client -w /client \
    --network checkers-net \
    --env RPC_URL="http://checkers:26657" \
    node:18.7-slim \
    npm test

# Launch local checkers + run test
# (reminder to update env file wither proper value)
ignite chain serve

npm test
```
