const { Router } = require('express');

module.exports = function ({ bookController }) {
    const router = Router();

    router.get('/', bookController.index);

    return router;
};