import refundService from '#features/refunds/refund.service.js';

/**
 * RefundController class.
 */
class RefundController {
  /**
   * Handles incoming request from the /refunds endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async findAll(request, response, next) {
    try {
      const { page = 1, size = 50, sort, order_id } = request.query;

      const result = await refundService.findAll({
        page: Number(page),
        size: Number(size),
        sort,
        order_id: order_id ? Number(order_id) : undefined,
      });

      response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /refunds/:refund_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async findById(request, response, next) {
    try {
      const { refund_id } = request.params;

      const refundById = await refundService.findById(Number(refund_id));

      response.status(200).json(refundById);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /refunds/order/:order_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async findByOrderId(request, response, next) {
    try {
      const { order_id } = request.params;

      const refundByOrderId = await refundService.findByOrderId(Number(order_id));

      response.status(200).json(refundByOrderId);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /refunds/order/:order_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async create(request, response, next) {
    try {
      const { order_id } = request.params;
      const createdRefund = await refundService.create(Number(order_id), request.body);

      response.status(201).set('Location', `/refunds/${createdRefund.id}`).end();
    } catch (err) {
      next(err);
    }
  }
}

export default new RefundController();
