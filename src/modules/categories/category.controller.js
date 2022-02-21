const categoryService = require('./category.service');
const categoryMapper = require('./category.mapper');

/**
 * Handles incoming request from the /categories endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const index = async (request, response, next) => {
  try {
    const { skip, limit, sort } = request.query;

    const categories = await categoryService.findAll({ skip, limit, sort });

    const categoriesDto = categories.map((category) => categoryMapper.toDto(category));

    response.json({
      message: 'Ok',
      data: categoriesDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /categories/:category_id endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const show = async (request, response, next) => {
  try {
    const { category_id } = request.params;

    const categoryById = await categoryService.findById(category_id);

    const categoryDto = categoryMapper.toDto(categoryById);

    response.json({
      message: 'Ok',
      data: categoryDto,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  show,
};
