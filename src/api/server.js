const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');

module.exports = ({ config, router, logger }) => {
    const app = express();

    app.use(cors())
        .use(express.json())
        .use(compression())
        .use(morgan('dev', { stream: logger.stream.write }))
        .use(helmet())
        .use(router)
        .use((err, req, res, next) => {
            logger.log({
                level: err.status ? 'info' : 'error',
                message: err.message,
            });

            if (!err.fatal) {
                res.status(err.status || 500).send({
                    message: err.message,
                    error: err.name !== 'Error' ? err.name : 'Internal server error',
                    data: err.errors,
                });

                return;
            }

            process.exit(5);
        });

    return new Promise((resolve) => {
        app.listen(config.PORT, () => {
            logger.log({
                level: 'info',
                message: `Application running on: ${config.APP_URL}:${config.PORT}`,
            });

            resolve();
        });
    });
};
