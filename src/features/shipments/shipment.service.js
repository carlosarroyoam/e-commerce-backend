import OrderRepository from '#features/orders/order.repository.js';
import ShipmentRepository from '#features/shipments/shipment.repository.js';

import shipmentMapper from '#app/features/shipments/shipment.mapper.js';
import sharedErrors from '#core/errors/index.js';
import dbConnectionPool from '#core/lib/mysql/connectionPool.js';
import logger from '#core/lib/winston/logger.js';

/**
 * ShipmentService class.
 */
class ShipmentService {
  /**
   * Retrieves all shipments.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @return {Promise} The list of shipments.
   */
  async findAll({ page = 1, size = 50, sort = 'id' }) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const shipmentRepository = new ShipmentRepository(connection);

      const totalShipments = await shipmentRepository.count();
      const shipments = await shipmentRepository.findAll({ page, size, sort });

      connection.release();

      return {
        items: shipments.map((shipment) => shipmentMapper.toDto(shipment)),
        pagination: {
          page: shipments.length > 0 ? page : 0,
          size: shipments.length,
          totalItems: totalShipments,
          totalPages: Math.ceil(totalShipments / size),
        },
      };
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while retrieving shipments');
      }

      throw err;
    }
  }

  /**
   * Retrieves a shipment by its id.
   *
   * @param {number} shipment_id The id of the shipment to retrieve.
   * @return {Promise} The shipment.
   */
  async findById(shipment_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const shipmentRepository = new ShipmentRepository(connection);

      const shipmentById = await shipmentRepository.findById(shipment_id);

      if (!shipmentById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      connection.release();

      return { ...shipmentMapper.toDto(shipmentById) };
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while retrieving shipment');
      }

      throw err;
    }
  }

  /**
   * Retrieves a shipment by order id.
   *
   * @param {number} order_id The id of the order to retrieve.
   * @return {Promise} The shipment.
   */
  async findByOrderId(order_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const shipmentRepository = new ShipmentRepository(connection);

      const shipmentById = await shipmentRepository.findByOrderId(order_id);

      if (!shipmentById) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      connection.release();

      return { ...shipmentMapper.toDto(shipmentById) };
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while retrieving shipment');
      }

      throw err;
    }
  }

  /**
   * Stores a shipment for an order.
   *
   * @param {number} order_id The id of the order to store the shipment for.
   * @param {object} shipmentData The shipment to store.
   * @return {Promise} The created shipment.
   */
  async create(order_id, shipmentData) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const orderRepository = new OrderRepository(connection);
      const shipmentRepository = new ShipmentRepository(connection);

      const orderById = await orderRepository.findById(order_id);

      if (!orderById) {
        throw new sharedErrors.ResourceNotFoundError('Order not found');
      }

      const existingShipment = await shipmentRepository.findByOrderId(order_id);
      if (existingShipment) {
        throw new sharedErrors.BadRequestError('Shipment already exists for this order');
      }

      connection.beginTransaction();

      const shippedStatusId = 3;
      await orderRepository.updateStatus(order_id, shippedStatusId);
      await orderRepository.storeStatusHistory({
        order_id,
        status_id: shippedStatusId,
        note: 'Order shipped',
      });

      await shipmentRepository.store({
        order_id,
        carrier_id: shipmentData.carrier_id,
        tracking_number: shipmentData.tracking_number,
        shippedAt: new Date(),
      });

      const shipmentByOrderId = await shipmentRepository.findByOrderId(order_id);

      await connection.commit();
      connection.release();

      return { ...shipmentMapper.toDto(shipmentByOrderId) };
    } catch (err) {
      if (connection) {
        await connection.rollback();
        connection.release();
      }

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while creating shipment');
      }

      throw err;
    }
  }

  /**
   * Updates a shipment as delivered by its id.
   *
   * @param {number} shipment_id The id of the shipment to update.
   * @return {Promise} The updated shipment.
   */
  async updateDelivered(shipment_id) {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const shipmentRepository = new ShipmentRepository(connection);
      const orderRepository = new OrderRepository(connection);

      const shipment = await shipmentRepository.findById(shipment_id);

      if (!shipment) {
        throw new sharedErrors.ResourceNotFoundError();
      }

      connection.beginTransaction();

      await shipmentRepository.update(shipment_id, {
        delivered_at: new Date(),
      });

      const deliveredStatusId = 4;
      await orderRepository.updateStatus(shipment.order_id, deliveredStatusId);
      await orderRepository.storeStatusHistory({
        order_id: shipment.order_id,
        status_id: deliveredStatusId,
        note: 'Order delivered',
      });

      const shipmentId = await shipmentRepository.findById(shipment_id);

      await connection.commit();
      connection.release();

      return { ...shipmentMapper.toDto(shipmentId) };
    } catch (err) {
      if (connection) {
        await connection.rollback();
        connection.release();
      }

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while updating shipment');
      }

      throw err;
    }
  }

  /**
   * Retrieves all active carriers.
   *
   * @return {Promise} The list of carriers.
   */
  async getCarriers() {
    let connection;

    try {
      connection = await dbConnectionPool.getConnection();
      const shipmentRepository = new ShipmentRepository(connection);

      const carriers = await shipmentRepository.getCarriers();

      connection.release();

      return carriers;
    } catch (err) {
      if (connection) connection.release();

      if (!err.status) {
        logger.error({ message: err.message });
        throw new sharedErrors.InternalServerError('Error while retrieving carriers');
      }

      throw err;
    }
  }
}

export default new ShipmentService();
