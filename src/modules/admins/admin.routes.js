const { Router } = require('express');
const validateMiddleware = require('../core/middlewares/validateRequest.middleware');
const createAdminDto = require('./dtos/create.dto');
const updateAdminDto = require('./dtos/update.dto');

module.exports = ({ adminController, verifyTokenMiddleware }) => {
  const router = Router();

  router.get('/', verifyTokenMiddleware, adminController.index.bind(adminController));
  router.get('/:id', adminController.show.bind(adminController));
  router.post('/', validateMiddleware(createAdminDto), adminController.store.bind(adminController));
  router.put('/:id', validateMiddleware(updateAdminDto), adminController.update.bind(adminController));

  return router;
};
