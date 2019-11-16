init:
	cp env.dist .env
	docker-compose up -d mongo
	sleep 5
	docker-compose exec mongo mongo mongo/rocketchat --eval "rs.initiate({ _id: 'rs0', members: [ { _id: 0, host: 'localhost:27017' } ]})"
	docker-compose up -d
	sleep 5
	docker-compose exec puppeteer bash -c 'cd /home/node/app && npm ci'
	docker-compose exec puppeteer node /home/node/app/provision/rocketchat.js
	docker-compose up -d

puppeteer:
	docker-compose exec puppeteer node /home/node/app/src/index.js
