init:
	cp env.dist .env
	docker-compose up -d mongo
	docker-compose run --rm wait -c mongo:27017 -t 15
	docker-compose exec mongo mongo mongo/rocketchat --eval "rs.initiate({ _id: 'rs0', members: [ { _id: 0, host: 'localhost:27017' } ]})"
	docker-compose up -d
	docker-compose exec puppeteer bash -c 'cd /home/node/app && npm ci'
	docker-compose run --rm wait -c rocketchat:3000 -t 45
	docker-compose exec puppeteer bash -c 'cd /home/node/app/provision/ && npm ci'
	docker-compose exec puppeteer node /home/node/app/provision/rocketchat.js
	docker-compose up -d

puppeteer:
	docker-compose exec puppeteer bash -c 'cd /home/node/app && npx tsc && node /home/node/app/build/src/index.js'
