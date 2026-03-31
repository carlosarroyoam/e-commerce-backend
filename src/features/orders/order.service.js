import { randomUUID } from 'crypto';

import OrderRepository from '#features/orders/order.repository.js';

import orderMapper from '#app/features/orders/order.mapper.js';
import shipmentMapper from '#app/features/shipments/shipment.mapper.js';
import sharedErrors from '#core/errors/index.js';
import dbConnectionPool from '#core/lib/mysql/connectionPool.js';
import logger from '#core/lib/winston/logger.js';
import refundMapper from '#app/features/refunds/refund.mapper.js';

/**
 * OrderService class.
 */
class OrderService {
  /**
   * Retrieves all orders.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @param {string} queryOptions.search The search criteria.
   * @param {number} queryOptions.customer_id The customer id to query.
   * @return {Promise} The list of orders.
   */
  async findAll({ page = 1, size = 50, sort = 'id', search, customer_id }) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const orderRepository = new OrderRepository(connection);

      const totalOrders = await orderRepository.count({ search, customer_id });
      const orders = await orderRepository.findAll({ page, size, sort, search, customer_id });

      connection.release();

      return {
        items: orders.map((order) => orderMapper.toDto(order)),
        pagination: {
          page: orders.length > 0 ? page : 0,
          size: orders.length,
          totalItems: totalOrders,
          totalPages: Math.ceil(totalOrders / size),
        },
      };
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while retrieving orders');
      }

      throw err;
    }
  }

  /**
   * Retrieves an order by its order number.
   *
   * @param {string} orderNumber The order number to retrieve.
   * @return {Promise} The order tracking information.
   */
  async findByOrderNumber(orderNumber) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const orderRepository = new OrderRepository(connection);

      const orderById = await orderRepository.findByOrderNumber(orderNumber);

      if (!orderById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      const statusHistoryByOrderId = await orderRepository.findStatusHistoryByOrderId(orderById.id);
      const shipmentByOrderId = await orderRepository.findShipmentByOrderId(orderById.id);

      connection.release();

      return {
        ...orderMapper.toDto(orderById),
        statusHistory: statusHistoryByOrderId.map((history) =>
          orderMapper.toStatusHistoryDto(history)
        ),
        shipment: shipmentByOrderId ? shipmentMapper.toDto(shipmentByOrderId) : null,
      };
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while tracking order');
      }

      throw err;
    }
  }

  /**
   * Retrieves an order by its id.
   *
   * @param {number} order_id The id of the order to retrieve.
   * @return {Promise} The order.
   */
  async findById(order_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const orderRepository = new OrderRepository(connection);

      const orderById = await orderRepository.findById(order_id);

      if (!orderById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      const itemsByOrderId = await orderRepository.findItemsByOrderId(order_id);
      const statusHistoryByOrderId = await orderRepository.findStatusHistoryByOrderId(order_id);
      const shipmentByOrderId = await orderRepository.findShipmentByOrderId(order_id);
      const refundByOrderId = await orderRepository.findRefundByOrderId(order_id);

      let refundItems = null;
      if (refundByOrderId) {
        refundItems = await orderRepository.findRefundItemsByRefundId(refundByOrderId.id);
      }

      connection.release();

      return {
        ...orderMapper.toDto(orderById),
        items: itemsByOrderId.map((item) => orderMapper.toItemDto(item)),
        statusHistory: statusHistoryByOrderId.map((sh) => orderMapper.toStatusHistoryDto(sh)),
        shipment: shipmentByOrderId ? shipmentMapper.toDto(shipmentByOrderId) : null,
        refund: refundByOrderId
          ? {
            ...refundMapper.toDto(refundByOrderId),
            items: refundItems.map((item) => refundMapper.toItemDto(item)),
          }
          : null,
      };
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while retrieving order');
      }

      throw err;
    }
  }

  /**
   * Stores an order.
   *
   * @param {object} orderData The order to store.
   * @return {Promise} The created order.
   */
  async create(orderData) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const orderRepository = new OrderRepository(connection);

      connection.beginTransaction();

      const order_number = randomUUID();
      const pendingStatusId = 1;

      const createdOrderId = await orderRepository.store({
        ...orderData,
        orderNumber: order_number,
        status_id: pendingStatusId,
        payment_status_id: 1,
      });

      await orderRepository.storeStatusHistory({
        order_id: createdOrderId,
        status_id: pendingStatusId,
        note: 'Order created',
      });

      for (const item of orderData.items) {
        const currentStock = await orderRepository.getVariantStock(item.variant_id);

        if (!currentStock || currentStock.quantity_on_stock < item.quantity) {
          throw new sharedErrors.BadRequestError(
            `Insufficient stock for variant ${item.variant_id}`
          );
        }

        const newQuantity = currentStock.quantity_on_stock - item.quantity;
        await orderRepository.updateVariantStock(item.variant_id, newQuantity);

        await orderRepository.storeItem({
          order_id: createdOrderId,
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total: item.quantity * item.unit_price,
        });
      }

      const createdOrder = this.findById(createdOrderId);

      await connection.commit();
      connection.release();

      return { ...orderMapper.toDto(createdOrder) };
    } catch (err) {
      if (connection) {
        await connection.rollback();
        connection.release();
      }

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while creating order');
      }

      throw err;
    }
  }

  /**
   * Updates an order status by its id.
   *
   * @param {number} order_id The id of the order to update.
   * @param {number} status_id The status id to update.
   * @param {string} note The note for the status history entry.
   * @return {Promise} The updated order.
   */
  async updateStatus(order_id, status_id, note) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const orderRepository = new OrderRepository(connection);

      const order = await orderRepository.findById(order_id);

      if (!order) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      connection.beginTransaction();

      await orderRepository.updateStatus(order_id, status_id);
      await orderRepository.storeStatusHistory({
        order_id,
        status_id,
        note,
      });

      await connection.commit();
      connection.release();

      return this.findById(order_id);
    } catch (err) {
      if (connection) {
        await connection.rollback();
        connection.release();
      }

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while updating order status');
      }

      throw err;
    }
  }

  /**
   * Updates an order payment status by its id.
   *
   * @param {number} order_id The id of the order to update.
   * @param {number} payment_status_id The payment status id to update.
   * @return {Promise} The updated order.
   */
  async updatePaymentStatus(order_id, payment_status_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const orderRepository = new OrderRepository(connection);

      const orderById = await orderRepository.findById(order_id);

      if (!orderById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      await orderRepository.updatePaymentStatus(order_id, payment_status_id);

      const updatedOrder = this.findById(orderById.id);

      connection.release();

      return { ...orderMapper.toDto(updatedOrder) };
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while updating payment status');
      }

      throw err;
    }
  }
}

export default new OrderService();
