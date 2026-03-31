import OrderRepository from '#features/orders/order.repository.js';
import RefundRepository from '#features/refunds/refund.repository.js';

import refundMapper from '#app/features/refunds/refund.mapper.js';
import sharedErrors from '#core/errors/index.js';
import dbConnectionPool from '#core/lib/mysql/connectionPool.js';
import logger from '#core/lib/winston/logger.js';

/**
 * RefundService class.
 */
class RefundService {
  /**
   * Retrieves all refunds.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @param {number} queryOptions.order_id The order id to query.
   * @return {Promise} The list of refunds.
   */
  async findAll({ page = 1, size = 50, sort = 'id', order_id }) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const refundRepository = new RefundRepository(connection);

      const totalRefunds = await refundRepository.count({ order_id });
      const refunds = await refundRepository.findAll({ page, size, sort, order_id });

      connection.release();

      return {
        refunds: refunds.map((refund) => refundMapper.toDto(refund)),
        pagination: {
          page: refunds.length > 0 ? page : 0,
          size: refunds.length,
          totalItems: totalRefunds,
          totalPages: Math.ceil(totalRefunds / size),
        },
      };
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while retrieving refunds');
      }

      throw err;
    }
  }

  /**
   * Retrieves a refund by its id.
   *
   * @param {number} refund_id The id of the refund to retrieve.
   * @return {Promise} The refund.
   */
  async findById(refund_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const refundRepository = new RefundRepository(connection);

      const refund = await refundRepository.findById(refund_id);

      if (!refund) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      const items = await refundRepository.findItemsByRefundId(refund_id);

      connection.release();

      return {
        ...refundMapper.toDto(refund),
        items: items.map((item) => refundMapper.toItemDto(item)),
      };
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while retrieving refund');
      }

      throw err;
    }
  }

  /**
   * Retrieves a refund by order id.
   *
   * @param {number} order_id The id of the order to retrieve.
   * @return {Promise} The refund.
   */
  async findByOrderId(order_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const refundRepository = new RefundRepository(connection);

      const refundById = await refundRepository.findByOrderId(order_id);

      if (!refundById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      const itemsByRefundId = await refundRepository.findItemsByRefundId(refundById.id);

      connection.release();

      return {
        ...refundMapper.toDto(refundById),
        items: itemsByRefundId.map((item) => refundMapper.toItemDto(item)),
      };
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while retrieving refund');
      }

      throw err;
    }
  }

  /**
   * Stores a refund for an order.
   *
   * @param {number} order_id The id of the order to store the refund for.
   * @param {object} refundData The refund to store.
   * @return {Promise} The created refund.
   */
  async create(order_id, refundData) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const orderRepository = new OrderRepository(connection);
      const refundRepository = new RefundRepository(connection);

      const order = await orderRepository.findById(order_id);

      if (!order) {
        throw new sharedErrors.ResourceNotFoundError('Order not found');
      }

      connection.beginTransaction();

      let totalRefundAmount = 0;
      for (const item of refundData.items) {
        const orderItems = await orderRepository.findItemsByOrderId(order_id);
        const orderItem = orderItems.find((oi) => oi.id === item.order_item_id);

        if (!orderItem) {
          throw new sharedErrors.BadRequestError(`Invalid order item: ${item.order_item_id}`);
        }

        if (item.quantity > orderItem.quantity) {
          throw new sharedErrors.BadRequestError(
            `Refund quantity exceeds ordered quantity for item ${item.order_item_id}`
          );
        }

        totalRefundAmount += item.amount;

        const [[variant]] = await connection.query(
          'SELECT quantity_on_stock FROM variants WHERE id = ?',
          [orderItem.variant_id]
        );
        const newQuantity = variant.quantity_on_stock + item.quantity;
        await connection.query('UPDATE variants SET quantity_on_stock = ? WHERE id = ?', [
          newQuantity,
          orderItem.variant_id,
        ]);
      }

      const createdRefundId = await refundRepository.store({
        order_id,
        amount: totalRefundAmount,
        reason: refundData.reason,
      });

      for (const item of refundData.items) {
        await refundRepository.storeItem({
          refund_id: createdRefundId,
          order_item_id: item.order_item_id,
          quantity: item.quantity,
          amount: item.amount,
        });
      }

      const refundedStatusId = 5;
      await orderRepository.updateStatus(order_id, refundedStatusId);
      await orderRepository.storeStatusHistory({
        order_id,
        status_id: refundedStatusId,
        note: 'Order refunded',
      });

      const createdRefound = await refundRepository.findById(createdRefundId);
      const items = await refundRepository.findItemsByRefundId(createdRefound.id);

      await connection.commit();
      connection.release();

      return {
        ...refundMapper.toDto(createdRefound),
        items: items.map((item) => refundMapper.toItemDto(item)),
      };
    } catch (err) {
      if (connection) {
        await connection.rollback();
        connection.release();
      }

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while creating refund');
      }

      throw err;
    }
  }
}

export default new RefundService();
