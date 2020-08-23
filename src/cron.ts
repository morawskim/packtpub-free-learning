import cron from 'node-cron';
import logger from './winston';
import scrapper from './main';

(function () {
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
})()
