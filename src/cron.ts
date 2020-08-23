const cron = require('node-cron');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'logger'.
const logger = require('./winston');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'scrapper'.
const scrapper = require('./main');

const cronExpression = process.env.CRON_EXPRESSION || '50 7 * * *';
const validateResult = cron.validate(cronExpression);
if (!validateResult) {
    logger.error(`Given string "${cronExpression}" is not valid cron expression.`);
    process.exit(1);
}

cron.schedule(cronExpression, async () => {
    try {
        await scrapper();
        logger.info('Extracted information about free book and send them to rocket chat');
    } catch (e) {
        logger.error(e);
    }
});
logger.info('Started');
