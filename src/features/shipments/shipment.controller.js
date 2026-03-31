import shipmentService from '#features/shipments/shipment.service.js';

/**
 * ShipmentController class.
 */
class ShipmentController {
  /**
   * Handles incoming request from the /shipments endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async findAll(request, response, next) {
    try {
      const { page = 1, size = 50, sort } = request.query;

      const result = await shipmentService.findAll({
        page: Number(page),
        size: Number(size),
        sort,
      });

      response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /shipments/:shipment_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async findById(request, response, next) {
    try {
      const { shipment_id } = request.params;
      const result = await shipmentService.findById(Number(shipment_id));

      response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /shipments/order/:order_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async findByOrderId(request, response, next) {
    try {
      const { order_id } = request.params;
      const result = await shipmentService.findByOrderId(Number(order_id));

      response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /shipments/:order_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async create(request, response, next) {
    try {
      const { order_id } = request.params;
      const result = await shipmentService.create(Number(order_id), request.body);

      response.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /shipments/:shipment_id/delivered endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async markDelivered(request, response, next) {
    try {
      const { shipment_id } = request.params;
      const result = await shipmentService.updateDelivered(Number(shipment_id));

      response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /shipments/carriers endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async getCarriers(request, response, next) {
    try {
      const result = await shipmentService.getCarriers();

      response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export default new ShipmentController();
