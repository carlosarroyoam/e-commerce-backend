import categoryService from './category.service.js';
import categoryMapper from './category.mapper.js';

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

			const categoryDto = categoryMapper.toDto(categoryById);

			response.json({
				message: 'Ok',
				data: categoryDto,
			});
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

			const createdCategoryDto = categoryMapper.toDto(createdCategory);

			response.status(201).json({
				message: 'Ok',
				data: createdCategoryDto,
			});
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

			const updatedCategory = await categoryService.update(category_id, {
				title,
			});

			const updatedCategoryDto = categoryMapper.toDto(updatedCategory);

			response.json({
				message: 'Ok',
				data: updatedCategoryDto,
			});
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

			const deletedCategoryId = await categoryService.deleteById(category_id);

			response.json({
				message: 'Ok',
				data: {
					category_id: deletedCategoryId,
				},
			});
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

			const restoredCategoryId = await categoryService.restore(category_id);

			response.json({
				message: 'Ok',
				data: {
					category_id: restoredCategoryId,
				},
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new CategoryController();
