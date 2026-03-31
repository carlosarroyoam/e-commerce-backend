import ShipmentDao from '#features/shipments/shipment.dao.js';
import shipmentMapper from '#features/shipments/shipment.mapper.js';

/**
 * ShipmentRepository class.
 */
class ShipmentRepository {
  /**
   * ShipmentRepository class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
    this.shipmentDao = new ShipmentDao(this.connection);
  }

  /**
   * Retrieves all shipments.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @return {Promise} The result of the query.
   */
  async findAll({ page = 1, size = 50, sort = 'id' }) {
    const [result] = await this.shipmentDao.getAll({ page, size, sort });
    return result;
  }

  /**
   * Retrieves the shipments count.
   *
   * @return {Promise} The result of the query.
   */
  async count() {
    const [[{ count }]] = await this.shipmentDao.count();
    return count;
  }

  /**
   * Retrieves a shipment by its id.
   *
   * @param {number} shipment_id The id of the shipment to retrieve.
   * @return {Promise} The result of the query.
   */
  async findById(shipment_id) {
    const [[result]] = await this.shipmentDao.getById(shipment_id);
    return result;
  }

  /**
   * Retrieves a shipment by order id.
   *
   * @param {number} order_id The id of the order to retrieve.
   * @return {Promise} The result of the query.
   */
  async findByOrderId(order_id) {
    const [[result]] = await this.shipmentDao.getByOrderId(order_id);
    return result;
  }

  /**
   * Stores a shipment.
   *
   * @param {object} shipment The shipment to store.
   * @return {Promise} The created shipment id.
   */
  async store(shipment) {
    const shipmentDbEntity = shipmentMapper.toDatabaseEntity(shipment);
    const [result] = await this.shipmentDao.create(shipmentDbEntity);
    return result.insertId;
  }

  /**
   * Updates a shipment by its id.
   *
   * @param {number} shipment_id The id of the shipment to update.
   * @param {object} updates The shipment fields to update.
   * @return {Promise} The result of the query.
   */
  async update(shipment_id, updates) {
    const [result] = await this.shipmentDao.update(shipment_id, updates);
    return result;
  }

  /**
   * Retrieves all active carriers.
   *
   * @return {Promise} The result of the query.
   */
  async getCarriers() {
    const [result] = await this.shipmentDao.getCarriers();
    return result;
  }
}

export default ShipmentRepository;
