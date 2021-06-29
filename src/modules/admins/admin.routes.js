const { Router } = require('express');
const validateMiddleware = require('../core/middlewares/validateRequest.middleware');
const createAdminDto = require('./schemas/create.dto');
const updateAdminDto = require('./schemas/update.dto');

module.exports = ({ adminController, verifyTokenMiddleware }) => {
  const router = Router();

  router.get('/', verifyTokenMiddleware, adminController.index.bind(adminController));
  router.get('/:adminId', verifyTokenMiddleware, adminController.show.bind(adminController));
  router.post('/', verifyTokenMiddleware, validateMiddleware(createAdminDto), adminController.store.bind(adminController));
  router.put('/:adminId', verifyTokenMiddleware, validateMiddleware(updateAdminDto), adminController.update.bind(adminController));

  return router;
};
