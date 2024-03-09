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
      const attributes = await attributeService.findAll();

      const attributesDto = attributes.map((attribute) => attributeMapper.toDto(attribute));

      response.json({
        message: 'Ok',
        attributes: attributesDto,
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

      const attributeDto = attributeMapper.toDto(attributeById);

      response.json({
        message: 'Ok',
        attribute: attributeDto,
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

      const createdAttributeDto = attributeMapper.toDto(createdAttribute);

      response.status(201).json({
        message: 'Ok',
        attribute: createdAttributeDto,
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

      const updatedAttributeDto = attributeMapper.toDto(updatedAttribute);

      response.json({
        message: 'Ok',
        attribute: updatedAttributeDto,
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
