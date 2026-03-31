import RefundDao from '#features/refunds/refund.dao.js';
import refundMapper from '#features/refunds/refund.mapper.js';

/**
 * RefundRepository class.
 */
class RefundRepository {
  /**
   * RefundRepository class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
    this.refundDao = new RefundDao(this.connection);
  }

  /**
   * Retrieves all refunds.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @param {number} queryOptions.order_id The order id to query.
   * @return {Promise} The result of the query.
   */
  async findAll({ page = 1, size = 50, sort = 'id', order_id }) {
    const [result] = await this.refundDao.getAll({ page, size, sort, order_id });
    return result;
  }

  /**
   * Retrieves the refunds count.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.order_id The order id to query.
   * @return {Promise} The result of the query.
   */
  async count({ order_id }) {
    const [[{ count }]] = await this.refundDao.count({ order_id });
    return count;
  }

  /**
   * Retrieves a refund by its id.
   *
   * @param {number} refund_id The id of the refund to retrieve.
   * @return {Promise} The result of the query.
   */
  async findById(refund_id) {
    const [[result]] = await this.refundDao.getById(refund_id);
    return result;
  }

  /**
   * Retrieves a refund by order id.
   *
   * @param {number} order_id The id of the order to retrieve.
   * @return {Promise} The result of the query.
   */
  async findByOrderId(order_id) {
    const [[result]] = await this.refundDao.getByOrderId(order_id);
    return result;
  }

  /**
   * Retrieves all refund items by refund id.
   *
   * @param {number} refund_id The id of the refund to retrieve.
   * @return {Promise} The result of the query.
   */
  async findItemsByRefundId(refund_id) {
    const [result] = await this.refundDao.getItemsByRefundId(refund_id);
    return result;
  }

  /**
   * Stores a refund.
   *
   * @param {object} refund The refund to store.
   * @return {Promise} The created refund id.
   */
  async store(refund) {
    const refundDbEntity = refundMapper.toDatabaseEntity(refund);
    const [result] = await this.refundDao.create(refundDbEntity);
    return result.insertId;
  }

  /**
   * Stores a refund item.
   *
   * @param {object} refundItem The refund item to store.
   * @return {Promise} The created refund item id.
   */
  async storeItem(refundItem) {
    const refundItemDbEntity = refundMapper.toDatabaseItemEntity(refundItem);
    const [result] = await this.refundDao.createItem(refundItemDbEntity);
    return result.insertId;
  }
}

export default RefundRepository;
