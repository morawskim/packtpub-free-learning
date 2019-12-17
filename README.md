[![Codecov Coverage](https://img.shields.io/codecov/c/github/morawskim/packpub-free-learning
/master.svg?style=flat-square)](https://codecov.io/gh/morawskim/packpub-free-learning/)

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

If you don't do it the rocketchar container will not up: `packpubfreelearning_rocketchat_1   node main.js                     Exit 1 `
Open webrowser and go to url `rocketchat.lvh.me` and finish configuration.

Invoke the command `docker-compose exec puppeteer node /home/node/app/src/index.js`
Or use shortcut `make puppeteer`
