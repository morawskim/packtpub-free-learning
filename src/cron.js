const cron = require('node-cron');
const logger = require('./winston');
const scrapper = require('./main');

cron.schedule('50 7 * * *', async () => {
    try {
        await scrapper();
        logger.info('Extracted information about free book and send them to rocket chat');
    } catch (e) {
        logger.error(e);
    }
});
logger.info('Started');
