const { Router, json } = require('express');
const cors = require('cors');
const compression = require('compression');

module.exports = function ({ UserRoutes, BookRoutes }) {
    const router = Router();
    const apiRouter = Router();

    apiRouter
        .use(cors())
        .use(json())
        .use(compression());

    apiRouter.use('/user', UserRoutes);
    apiRouter.use('/book', BookRoutes);

    router.use('/api', apiRouter);

    return router;
}