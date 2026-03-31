import OrderDao from '#features/orders/order.dao.js';
import orderMapper from '#features/orders/order.mapper.js';

/**
 * OrderRepository class.
 */
class OrderRepository {
  /**
   * OrderRepository class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
    this.orderDao = new OrderDao(this.connection);
  }

  /**
   * Retrieves all orders.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @param {string} queryOptions.search The search criteria.
   * @param {number} queryOptions.customer_id The customer id to query.
   * @return {Promise} The result of the query.
   */
  async findAll({ page = 1, size = 50, sort = 'id', search, customer_id }) {
    const [result] = await this.orderDao.getAll({ page, size, sort, search, customer_id });
    return result;
  }

  /**
   * Retrieves the orders count.
   *
   * @param {object} queryOptions The query options.
   * @param {string} queryOptions.search The search criteria.
   * @param {number} queryOptions.customer_id The customer id to query.
   * @return {Promise} The result of the query.
   */
  async count({ search, customer_id }) {
    const [[{ count }]] = await this.orderDao.count({ search, customer_id });
    return count;
  }

  /**
   * Retrieves an order by its id.
   *
   * @param {number} order_id The id of the order to retrieve.
   * @return {Promise} The result of the query.
   */
  async findById(order_id) {
    const [[result]] = await this.orderDao.getById(order_id);
    return result;
  }

  /**
   * Retrieves an order by its order number.
   *
   * @param {string} orderNumber The order number of the order to retrieve.
   * @return {Promise} The result of the query.
   */
  async findByOrderNumber(orderNumber) {
    const [[result]] = await this.orderDao.getByOrderNumber(orderNumber);
    return result;
  }

  /**
   * Retrieves all order items by order id.
   *
   * @param {number} order_id The id of the order to retrieve.
   * @return {Promise} The result of the query.
   */
  async findItemsByOrderId(order_id) {
    const [result] = await this.orderDao.getItemsByOrderId(order_id);
    return result;
  }

  /**
   * Retrieves the status history of an order by its id.
   *
   * @param {number} order_id The id of the order to retrieve.
   * @return {Promise} The result of the query.
   */
  async findStatusHistoryByOrderId(order_id) {
    const [result] = await this.orderDao.getStatusHistoryByOrderId(order_id);
    return result;
  }

  /**
   * Retrieves the shipment of an order by its id.
   *
   * @param {number} order_id The id of the order to retrieve.
   * @return {Promise} The result of the query.
   */
  async findShipmentByOrderId(order_id) {
    const [[result]] = await this.orderDao.getShipmentByOrderId(order_id);
    return result;
  }

  /**
   * Retrieves a refund by order id.
   *
   * @param {number} order_id The id of the order to retrieve.
   * @return {Promise} The result of the query.
   */
  async findRefundByOrderId(order_id) {
    const [[result]] = await this.orderDao.getRefundByOrderId(order_id);
    return result;
  }

  /**
   * Retrieves all refund items by refund id.
   *
   * @param {number} refund_id The id of the refund to retrieve.
   * @return {Promise} The result of the query.
   */
  async findRefundItemsByRefundId(refund_id) {
    const [result] = await this.orderDao.getRefundItemsByRefundId(refund_id);
    return result;
  }

  /**
   * Stores an order.
   *
   * @param {object} order The order to store.
   * @return {Promise} The created order id.
   */
  async store(order) {
    const orderDbEntity = orderMapper.toDatabaseEntity(order);
    const [result] = await this.orderDao.create(orderDbEntity);
    return result.insertId;
  }

  /**
   * Stores an order item.
   *
   * @param {object} orderItem The order item to store.
   * @return {Promise} The created order item id.
   */
  async storeItem(orderItem) {
    const orderItemDbEntity = orderMapper.toDatabaseItemEntity(orderItem);
    const [result] = await this.orderDao.createItem(orderItemDbEntity);
    return result.insertId;
  }

  /**
   * Stores an order status history entry.
   *
   * @param {object} statusHistory The order status history entry to store.
   * @return {Promise} The created order status history entry id.
   */
  async storeStatusHistory(statusHistory) {
    const statusHistoryDbEntity = orderMapper.toDatabaseStatusHistoryEntity(statusHistory);
    const [result] = await this.orderDao.createStatusHistory(statusHistoryDbEntity);
    return result.insertId;
  }

  /**
   * Updates an order status by its id.
   *
   * @param {number} order_id The id of the order to update.
   * @param {number} status_id The status id to update.
   * @return {Promise} The result of the query.
   */
  async updateStatus(order_id, status_id) {
    const [result] = await this.orderDao.updateStatus(order_id, status_id);
    return result;
  }

  /**
   * Updates an order payment status by its id.
   *
   * @param {number} order_id The id of the order to update.
   * @param {number} payment_status_id The payment status id to update.
   * @return {Promise} The result of the query.
   */
  async updatePaymentStatus(order_id, payment_status_id) {
    const [result] = await this.orderDao.updatePaymentStatus(order_id, payment_status_id);
    return result;
  }

  /**
   * Stores a shipment.
   *
   * @param {object} shipment The shipment to store.
   * @return {Promise} The created shipment id.
   */
  async storeShipment(shipment) {
    const shipmentDbEntity = orderMapper.toDatabaseShipmentEntity(shipment);
    const [result] = await this.orderDao.createShipment(shipmentDbEntity);
    return result.insertId;
  }

  /**
   * Stores a refund.
   *
   * @param {object} refund The refund to store.
   * @return {Promise} The created refund id.
   */
  async storeRefund(refund) {
    const refundDbEntity = orderMapper.toDatabaseRefundEntity(refund);
    const [result] = await this.orderDao.createRefund(refundDbEntity);
    return result.insertId;
  }

  /**
   * Stores a refund item.
   *
   * @param {object} refundItem The refund item to store.
   * @return {Promise} The created refund item id.
   */
  async storeRefundItem(refundItem) {
    const refundItemDbEntity = orderMapper.toDatabaseRefundItemEntity(refundItem);
    const [result] = await this.orderDao.createRefundItem(refundItemDbEntity);
    return result.insertId;
  }

  /**
   * Retrieves the stock of a variant by its id.
   *
   * @param {number} variant_id The id of the variant to retrieve.
   * @return {Promise} The result of the query.
   */
  async getVariantStock(variant_id) {
    const [[result]] = await this.orderDao.getVariantStock(variant_id);
    return result;
  }

  /**
   * Updates the stock of a variant by its id.
   *
   * @param {number} variant_id The id of the variant to update.
   * @param {number} quantity The quantity to update.
   * @return {Promise} The result of the query.
   */
  async updateVariantStock(variant_id, quantity) {
    const [result] = await this.orderDao.updateVariantStock(variant_id, quantity);
    return result;
  }
}

export default OrderRepository;
