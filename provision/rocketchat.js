const RocketChatApi = require('rocketchat-api');
const { parse, stringify } = require('envfile');
const path = require('path');
const fs = require('fs');
const url = require('url');

function getConfiguration() {
    const envFile = `${configDir}/.env`;
    const envDistFile = `${configDir}/env.dist`;

    let configuration = {};
    if (fs.existsSync(envFile)) {
        configuration = parse(fs.readFileSync(envFile).toString());
    } else if (fs.existsSync(envDistFile)) {
        configuration = parse(fs.readFileSync(envDistFile).toString());
    } else {
        throw new Error(`At "${configDir}" not exist neither .env or env.dist file`);
    }

    return configuration;
}

async function createIntegration(rocketChatUrl) {
    const rocketChatApi = new RocketChatApi(rocketChatUrl.protocol, rocketChatUrl.hostname, rocketChatUrl.port);
    await rocketChatApi.authentication.login('root', 'root', async () => {
        const response = await rocketChatApi.integration.create({
            "type": "webhook-incoming",
            "name": "packtpub free book",
            "enabled": true,
            "username": "rocket.cat",
            "scriptEnabled": false,
            "channel" : "#general",
            "alias": "Learning BOT",
        });
        if (!response.success) {
            console.error("Error during add rocket chat integration");
        }
        configuration.ROCKETCHAT_WEBHOOK_URL = `${rocketChatUrl.protocol}//${rocketChatUrl.hostname}:${rocketChatUrl.port}/hooks/${response.integration._id}/${response.integration.token}`;
        fs.writeFileSync(configDir + "/.env", stringify(configuration));
        process.exit(0);
    });
}

const configDir = path.normalize(__dirname) + '/../';
const rocketChatUrl = new url.URL('http://rocketchat:3000');
const configuration = getConfiguration(configDir);
createIntegration(rocketChatUrl);
