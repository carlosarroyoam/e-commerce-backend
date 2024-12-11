import attributeService from '#modules/attributes/attribute.service.js';
import attributeMapper from '#modules/attributes/attribute.mapper.js';

/**
 * AttributeController class.
 */
class AttributeController {
  /**
   * Handles incoming request from the /attributes endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async index(request, response, next) {
    try {
      const { page, size, sort } = request.query;

      const result = await attributeService.findAll({ page, size, sort });

      response.json({
        message: 'Ok',
        attributes: result.attributes.map((attribute) => attributeMapper.toDto(attribute)),
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /attributes/:attribute_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async show(request, response, next) {
    try {
      const { attribute_id } = request.params;

      const attributeById = await attributeService.findById(attribute_id);

      response.json({
        message: 'Ok',
        attribute: attributeMapper.toDto(attributeById),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /attributes endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async store(request, response, next) {
    try {
      const { title } = request.body;

      const createdAttribute = await attributeService.store({
        title,
      });

      response.status(201).json({
        message: 'Ok',
        attribute: attributeMapper.toDto(createdAttribute),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /attributes/:attribute_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async update(request, response, next) {
    try {
      const { attribute_id } = request.params;
      const { title } = request.body;

      const updatedAttribute = await attributeService.update(attribute_id, {
        title,
      });

      response.json({
        message: 'Ok',
        attribute: attributeMapper.toDto(updatedAttribute),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /attributes/:attribute_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async destroy(request, response, next) {
    try {
      const { attribute_id } = request.params;

      const deletedAttributeId = await attributeService.deleteById(attribute_id);

      response.json({
        message: 'Ok',
        attribute: {
          id: deletedAttributeId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /attributes/:attribute_id/restore endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async restore(request, response, next) {
    try {
      const { attribute_id } = request.params;

      const restoredAttributeId = await attributeService.restore(attribute_id);

      response.json({
        message: 'Ok',
        attribute: {
          id: restoredAttributeId,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AttributeController();
