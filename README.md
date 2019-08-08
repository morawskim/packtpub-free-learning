# About
This app downloads the title and cover of packtpub's free book.
Uses the `puppeteer` package to control google-chrome in headless mode.
It sends the downloaded information to the chat system (rocketchat) via the `axios` library. Integration with rocketchat involves the use of webhooks (incoming integration).

## Running

Copy `env.dist` to` .env`.
Adjust the environment variable values.
Invoke the command `docker-compose run --rm puppeteer node /home/node/app/src/index.js`
