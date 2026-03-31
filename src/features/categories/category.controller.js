import categoryService from '#features/categories/category.service.js';

/**
 * CategoryController class.
 */
class CategoryController {
  /**
   * Handles incoming request from the /categories endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async index(request, response, next) {
    try {
      const { page, size, sort } = request.query;

      const result = await categoryService.findAll({ page, size, sort });

      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /categories/:category_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async show(request, response, next) {
    try {
      const { category_id } = request.params;

      const categoryById = await categoryService.findById(category_id);

      response.status(200).json(categoryById);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /categories endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async store(request, response, next) {
    try {
      const { title } = request.body;

      const createdCategory = await categoryService.store({
        title,
      });

      response.status(201).set('Location', `/categories/${createdCategory.id}`).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /categories/:category_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async update(request, response, next) {
    try {
      const { category_id } = request.params;
      const { title } = request.body;

      await categoryService.update(category_id, {
        title,
      });

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /categories/:category_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async destroy(request, response, next) {
    try {
      const { category_id } = request.params;

      await categoryService.deleteById(category_id);

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /categories/:category_id/restore endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async restore(request, response, next) {
    try {
      const { category_id } = request.params;

      await categoryService.restore(category_id);

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
