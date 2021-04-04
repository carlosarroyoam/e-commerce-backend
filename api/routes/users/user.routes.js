const { Router } = require('express');

module.exports = function ({ userController }) {
    const router = Router();

    router.get('/', userController.index);

    return router;
};