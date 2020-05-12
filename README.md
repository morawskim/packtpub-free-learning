[![codecov](https://codecov.io/gh/morawskim/packtpub-free-learning/branch/master/graph/badge.svg)](https://codecov.io/gh/morawskim/packtpub-free-learning)

# About
This app downloads the title and cover of packtpub's free book.
Uses the `puppeteer` package to control google-chrome in headless mode.
It sends the downloaded information to the chat system (rocketchat) via the `axios` library. Integration with rocketchat involves the use of webhooks (incoming integration). Unit testing via `jest` library.
Development environment created via docker-compose.
Pipeline for build, test, audit dependiences and deploy via Gitlab-CI.

## Running

Run `make init`, on first run.
This command is shortcut for:
* install required npm packages
* provision rocketchat docker service (add incoming integration)
* initialize the replica set for mongo

If you don't do it the rocketchar container will not up: `packtpubfreelearning_rocketchat_1   node main.js                     Exit 1 `
Open webrowser and go to url `rocketchat.lvh.me` and finish configuration.

Invoke the command `docker-compose exec puppeteer node /home/node/app/src/index.js`
Or use shortcut `make puppeteer`

## Gitlab CI/CD variables

`SSH_PRIVATE_KEY` - private ssh key to deploy

`PROD_CONFIG` - `.env` file contents

`CODECOV_TOKEN` - token for [codecov](https://codecov.io/)

`DOCKER_USERNAME` - docker hub username (default value `morawskim`)

`DOCKER_PASSWORD` - docker hub password or access token

## Deploying
To deploy this script use docker.
You can use `docker-compose` or `docker swarm`.
In `deploy/docker-compose.sensi.yml` you can found example configuration.

If you don't change timezone then default value UTC will be used.
You can also set env `CRON_EXPRESSION` if you want to change the default time to fetch the information about the free book.
The default value is 7:50 AM.

In `.env` file you must have `ROCKETCHAT_WEBHOOK_URL` set to your incoming webhook URL.
