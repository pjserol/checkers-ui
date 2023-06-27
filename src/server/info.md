# Backend script for indexing

```sh
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
```

## Init server

```sh
npm install express@4.18.1 --save-exact
npm install @types/express@4.17.13 --save-dev --save-exact
```

## Start server indexer

```sh
npm run indexer-dev

# Get status
curl localhost:3001/status | jq

# Get player info
curl localhost:3001/players/cosmos123 | jq

# Get player games
curl localhost:3001/players/cosmos123/gameIds | jq

# Game update
curl -X PATCH localhost:3001/games/445 | jq
```
