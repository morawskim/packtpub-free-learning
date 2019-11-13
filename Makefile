
init:
	docker-compose exec mongo mongo mongo/rocketchat --eval "rs.initiate({ _id: 'rs0', members: [ { _id: 0, host: 'localhost:27017' } ]})"

puppeteer:
	docker-compose run --rm puppeteer node /home/node/app/src/index.js
