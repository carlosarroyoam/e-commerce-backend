const { Router } = require('express');

module.exports = function ({ BookController }) {
    const router = Router();

    router.get('/', BookController.index);

    return router;
};