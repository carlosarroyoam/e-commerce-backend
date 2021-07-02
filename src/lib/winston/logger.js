const winston = require('winston');
require('winston-daily-rotate-file');
const config = require('../../config');

const logger = winston.createLogger({
    level: 'warn',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: config.APP_NAME },
    transports: [
        //
        // - Write all logs with level `error` and below to `error-%DATE%.log`
        // - Write all logs with level `info` and below to `combined-%DATE%.log`
        //
        new winston.transports.DailyRotateFile({
            filename: 'logs/errors-%DATE%.log',
            datePattern: 'DD-MM-YYYY',
            zippedArchive: true,
            maxFiles: '14d',
            level: 'error',
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/combined-%DATE%.log',
            datePattern: 'DD-MM-YYYY',
            zippedArchive: true,
            maxFiles: '14d',
        }),
    ],
    exceptionHandlers: [
        //
        // - Write exceptions logs `exceptions-%DATE%.log`
        //
        new winston.transports.DailyRotateFile({
            filename: 'logs/exceptions-%DATE%.log',
            datePattern: 'DD-MM-YYYY',
            zippedArchive: true,
            maxFiles: '14d',
        }),
    ],
});

//
// If we're not in production then log to the `console`
//
if (config.APP_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({ format: 'DD/MM/YYYY hh:mm:ss a' }),
                winston.format.json()
            ),
            level: 'info',
            handleExceptions: true,
        })
    );
}

module.exports = logger;
