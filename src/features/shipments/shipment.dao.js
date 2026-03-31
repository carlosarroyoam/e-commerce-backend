/**
 * ShipmentDao class.
 */
class ShipmentDao {
  /**
   * ShipmentDao class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Performs the SQL query to get all shipments.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @return {Promise} The query result.
   */
  async getAll({ page, size, sort }) {
    let query = `SELECT
      s.id,
      s.order_id,
      o.order_number,
      c.name AS carrier,
      s.tracking_number,
      s.shipped_at,
      s.delivered_at
    FROM shipments s
    LEFT JOIN orders o ON s.order_id = o.id
    LEFT JOIN carriers c ON s.carrier_id = c.id
    WHERE 1`;

    if (sort) {
      let order = 'ASC';
      if (sort.charAt(0) === '-') {
        order = 'DESC';
        sort = sort.substring(1);
      }
      query += ` ORDER BY ${this.connection.escapeId(sort)} ${order}`;
    }

    query += ` LIMIT ${this.connection.escape((page - 1) * size)}, ${this.connection.escape(size)}`;

    return this.connection.query(query);
  }

  /**
   * Performs the SQL query to count all shipments.
   *
   * @return {Promise} The query result.
   */
  async count() {
    const query = `SELECT COUNT(*) AS count FROM shipments s WHERE 1`;
    return this.connection.query(query);
  }

  /**
   * Performs the SQL query to get a shipment by its id.
   *
   * @param {number} shipment_id The id of the shipment to query.
   * @return {Promise} The query result.
   */
  async getById(shipment_id) {
    const query = `SELECT
      s.id,
      s.order_id,
      o.order_number,
      s.carrier_id,
      c.name AS carrier,
      s.tracking_number,
      s.shipped_at,
      s.delivered_at
    FROM shipments s
    LEFT JOIN orders o ON s.order_id = o.id
    LEFT JOIN carriers c ON s.carrier_id = c.id
    WHERE s.id = ?`;

    return this.connection.query(query, [shipment_id]);
  }

  /**
   * Performs the SQL query to get a shipment by order id.
   *
   * @param {number} order_id The id of the order to query.
   * @return {Promise} The query result.
   */
  async getByOrderId(order_id) {
    const query = `SELECT
      s.id,
      s.order_id,
      o.order_number,
      s.carrier_id,
      c.name AS carrier,
      s.tracking_number,
      s.shipped_at,
      s.delivered_at
    FROM shipments s
    LEFT JOIN orders o ON s.order_id = o.id
    LEFT JOIN carriers c ON s.carrier_id = c.id
    WHERE s.order_id = ?`;

    return this.connection.query(query, [order_id]);
  }

  /**
   * Performs the SQL query to insert a shipment.
   *
   * @param {object} shipment The shipment to store.
   * @return {Promise} The query result.
   */
  async create(shipment) {
    const query = 'INSERT INTO shipments SET ?';
    return this.connection.query(query, [shipment]);
  }

  /**
   * Performs the SQL query to update a shipment by its id.
   *
   * @param {number} shipment_id The id of the shipment to update.
   * @param {object} updates The shipment fields to update.
   * @return {Promise} The query result.
   */
  async update(shipment_id, updates) {
    const query = 'UPDATE shipments SET ? WHERE id = ?';
    return this.connection.query(query, [updates, shipment_id]);
  }

  /**
   * Performs the SQL query to get all active carriers.
   *
   * @return {Promise} The query result.
   */
  async getCarriers() {
    const query = `SELECT id, name FROM carriers WHERE active = 1`;
    return this.connection.query(query);
  }
}

export default ShipmentDao;
