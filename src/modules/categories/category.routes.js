const { Router } = require('express');

const categoryController = require('./category.controller');

const verifyTokenMiddleware = require('../../shared/middlewares/verifyToken.middleware');
const adminGuardMiddleware = require('../../shared/middlewares/adminGuard.middleware');
const validateRequestMiddleware = require('../../shared/middlewares/validateRequest.middleware');

const indexCategorySchema = require('./schemas/index.schema');
const showCategorySchema = require('./schemas/show.schema');
const storeCategorySchema = require('./schemas/store.schema');
const updateCategorySchema = require('./schemas/update.schema');
const deleteCategorySchema = require('./schemas/delete.schema');
const restoreCategorySchema = require('./schemas/restore.schema');

module.exports = () => {
  const router = Router();

  router.get('/', validateRequestMiddleware(indexCategorySchema), categoryController.index);

  router.get(
    '/:category_id',
    validateRequestMiddleware(showCategorySchema),
    categoryController.index
  );

  router.post(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeCategorySchema),
    adminGuardMiddleware,
    categoryController.store
  );

  router.put(
    '/:category_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(updateCategorySchema),
    adminGuardMiddleware,
    categoryController.update
  );

  router.delete(
    '/:category_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(deleteCategorySchema),
    adminGuardMiddleware,
    categoryController.destroy
  );

  router.put(
    '/:category_id/restore',
    verifyTokenMiddleware,
    validateRequestMiddleware(restoreCategorySchema),
    adminGuardMiddleware,
    categoryController.restore
  );

  return router;
};
