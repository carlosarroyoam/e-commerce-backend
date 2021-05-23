const winston = require('winston');
require('winston-daily-rotate-file');

class Logger {
  constructor({ config }) {
    this._config = config;
    this.instance = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      defaultMeta: { service: 'nodejs-api' },
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
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
    });

    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (this._config.APP_ENV !== 'production') {
      this.instance.add(new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp({ format: 'DD/MM/YYYY hh:mm:ss A' }),
          winston.format.json(),
        ),
      }));
    }
  }
}

module.exports = Logger;
