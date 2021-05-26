const winston = require('winston');
require('winston-daily-rotate-file');

class Logger {
  constructor({ config }) {
    this._config = config;
    this.instance = winston.createLogger({
      level: 'warn',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      defaultMeta: { service: this._config.APP_NAME },
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
    });

    //
    // If we're not in production then log to the `console`
    //
    if (this._config.APP_ENV !== 'production') {
      this.instance.add(new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp({ format: 'DD/MM/YYYY hh:mm:ss A' }),
          winston.format.json(),
        ),
        level: 'info',
      }));
    }
  }
}

module.exports = Logger;
