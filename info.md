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

# Launch test with docker

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

```sh
# Launch checkers chain and faucet

# With Docker ignite
docker network create checkers-net

docker run --rm -it \
    -v $(pwd):/checkers \
    -w /checkers \
    -p 4500:4500 \
    -p 26657:26657 \
    --network checkers-net \
    --name checkers \
    --network-alias cosmos-faucet \
    checkers_i \
    ignite chain serve

# With Docker standalone
docker network create checkers-net
docker run --rm -it \
    -p 26657:26657 \
    --name checkers \
    --network checkers-net \
    --detach \
    checkersd_i:standalone start
sleep 10
docker run --rm -it \
    -p 4500:4500 \
    --name cosmos-faucet \
    --network checkers-net \
    --detach \
    cosmos-faucet_i:0.28.11 start http://checkers:26657
sleep 20


# Run test with Docker
docker run --rm -it \
    -v $(pwd):/client -w /client \
    --network checkers-net \
    --env RPC_URL="http://checkers:26657" \
    --env FAUCET_URL="http://cosmos-faucet:4500" \
    node:18.7-slim \
    npm test

# Stop docker containers
docker stop cosmos-faucet checkers
docker network rm checkers-net
```

## Prepare Webpack

```sh
npm install react-app-rewired@2.2.1 --save-dev --save-exact
```

## Integration with Keplr

```sh
npm install @keplr-wallet/types@0.10.17 --save-exact --save-dev
```

## Add token to account

```sh
curl --request POST \
        --header "Content-Type: application/json" \
        --data '{"address":"cosmos17excjd99u45c4fkzljwlx8eqyn5dplcujkwag8","denom":"stake"}' \
        localhost:4500/credit
```
