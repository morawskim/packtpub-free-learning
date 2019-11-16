const RocketChatApi = require('rocketchat-api');
const envfile = require('envfile');
const path = require('path');
const fs = require('fs');
const url = require('url');

function getConfiguration() {
    const envFile = `${configDir}/.env`;
    const envDistFile = `${configDir}/env.dist`;

    let configuration = {};
    if (fs.existsSync(envFile)) {
        configuration = envfile.parseFileSync(envFile);
    } else if (fs.existsSync(envDistFile)) {
        configuration = envfile.parseFileSync(envDistFile);
    } else {
        throw new Error(`At "${configDir}" not exist neither .env or env.dist file`);
    }

    return configuration;
}

async function createIntegration(rocketChatUrl) {
    const rocketChatApi = new RocketChatApi(rocketChatUrl.protocol, rocketChatUrl.hostname, rocketChatUrl.port);
    await rocketChatApi.authentication.login('admin', 'admin', async () => {
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
        fs.writeFileSync(configDir + "/.env", envfile.stringifySync(configuration));
        process.exit(0);
    });
}

const configDir = path.normalize(__dirname) + '/../';
const rocketChatUrl = new url.URL('http://rocketchat:3000');
const configuration = getConfiguration(configDir);
createIntegration(rocketChatUrl);
