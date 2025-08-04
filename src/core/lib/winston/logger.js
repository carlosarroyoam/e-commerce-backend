import 'winston-daily-rotate-file';
import winston from 'winston';
import config from '#core/config/index.js';

const logger = winston.createLogger({
  level: 'warn',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    //
    // Write all logs with level `error` and below to `logs/%DATE%/error.log`
    // Write all logs with level `info` and below to `logs/%DATE%/combined.log`
    //
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%/errors.log',
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxFiles: '14d',
      level: 'error',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%/combined.log',
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxFiles: '14d',
    }),
  ],
});

//
// If we're not in production then log to the `console`
//
if (config.APP.ENV !== 'prod') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'DD/MM/YYYY hh:mm:ss a' }),
        winston.format.colorize({ level: true }),
        winston.format.printf(
          (log) => `[${log.level}]: ${log.message} [${log.durationMs || log.timestamp}]`
        )
      ),
      level: 'info',
      handleExceptions: true,
    })
  );
}

export default logger;
