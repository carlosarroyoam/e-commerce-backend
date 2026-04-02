import orderService from '#features/orders/order.service.js';

/**
 * OrderController class.
 */
class OrderController {
  /**
   * Handles incoming request from the /orders endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async findAll(request, response, next) {
    try {
      const { page = 1, size = 50, sort, search } = request.query;
      const customer_id = request.user?.customer_id;

      const result = await orderService.findAll({
        page: Number(page),
        size: Number(size),
        sort,
        search,
        customer_id,
      });

      response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /orders/:order_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async findById(request, response, next) {
    try {
      const { order_id } = request.params;
      const orderById = await orderService.findById(Number(order_id));

      response.status(200).json(orderById);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /orders endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async create(request, response, next) {
    try {
      const createdOrder = await orderService.create(request.body);

      response.status(201).set('Location', `/orders/${createdOrder.id}`).end();
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /orders/:order_id/status endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async updateStatus(request, response, next) {
    try {
      const { order_id } = request.params;
      const { status_id, notes } = request.body;

      await orderService.updateStatus(Number(order_id), status_id, notes);

      response.status(204).end();
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /orders/:order_id/payment-status endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async updatePaymentStatus(request, response, next) {
    try {
      const { order_id } = request.params;
      const { payment_status_id } = request.body;

      await orderService.updatePaymentStatus(Number(order_id), payment_status_id);

      response.status(204).end();
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles incoming request from the /orders/track/:orderNumber endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async track(request, response, next) {
    try {
      const { orderNumber } = request.params;

      const orderTrack = await orderService.findByOrderNumber(orderNumber);

      response.status(200).json(orderTrack);
    } catch (err) {
      next(err);
    }
  }
}

export default new OrderController();
