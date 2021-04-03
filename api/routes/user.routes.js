const { Router } = require('express');
const UserController = require('../controllers/user.controller');

module.exports = function ({ UserController }) {
    const router = Router();

    router.get('/', UserController.index);

    return router;
};