const { Router } = require('express');

const categoryController = require('./category.controller');

const verifyTokenMiddleware = require('../../shared/middlewares/verifyToken.middleware');
const adminGuardMiddleware = require('../../shared/middlewares/adminGuard.middleware');
const validateRequestMiddleware = require('../../shared/middlewares/validateRequest.middleware');

const indexCategorySchema = require('./schemas/index.schema');
const showCategorySchema = require('./schemas/show.schema');
const storeCategorySchema = require('./schemas/store.schema');
const updateCategorySchema = require('./schemas/update.schema');

module.exports = () => {
  const router = Router();

  router.get('/', validateRequestMiddleware(indexCategorySchema), categoryController.index);

  router.get(
    '/:category_id',
    validateRequestMiddleware(showCategorySchema),
    categoryController.index
  );

  return router;
};
