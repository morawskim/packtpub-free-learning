const winston = require('winston');

const myFormat = winston.format.printf(({
    level,
    message,
    timestamp
}: any) => {
    return `${timestamp} ${level}: ${message}`;
});

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'logger'.
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DDTHH:mm:ss'}),
        myFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console({stderrLevels: ['error']})
    ]
});

module.exports = logger;