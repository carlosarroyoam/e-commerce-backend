/**
 * RefundDao class.
 */
class RefundDao {
  /**
   * RefundDao class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Performs the SQL query to get all refunds.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @param {number} queryOptions.order_id The order id to query.
   * @return {Promise} The query result.
   */
  async getAll({ page, size, sort, order_id }) {
    let query = `SELECT
      r.id,
      r.order_id,
      o.order_number,
      r.amount,
      r.reason,
      r.created_at
    FROM refunds r
    LEFT JOIN orders o ON r.order_id = o.id
    WHERE 1`;

    if (order_id) {
      query += ` AND r.order_id = ?`;
    }

    if (sort) {
      let order = 'ASC';
      if (sort.charAt(0) === '-') {
        order = 'DESC';
        sort = sort.substring(1);
      }
      query += ` ORDER BY ${this.connection.escapeId(sort)} ${order}`;
    }

    query += ` LIMIT ${this.connection.escape((page - 1) * size)}, ${this.connection.escape(size)}`;

    const params = order_id ? [order_id] : [];
    return this.connection.query(query, params);
  }

  /**
   * Performs the SQL query to count all refunds.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.order_id The order id to query.
   * @return {Promise} The query result.
   */
  async count({ order_id }) {
    let query = `SELECT COUNT(*) AS count FROM refunds r WHERE 1`;

    if (order_id) {
      query += ` AND r.order_id = ?`;
    }

    const params = order_id ? [order_id] : [];
    return this.connection.query(query, params);
  }

  /**
   * Performs the SQL query to get a refund by its id.
   *
   * @param {number} refund_id The id of the refund to query.
   * @return {Promise} The query result.
   */
  async getById(refund_id) {
    const query = `SELECT
      r.id,
      r.order_id,
      o.order_number,
      r.amount,
      r.reason,
      r.created_at
    FROM refunds r
    LEFT JOIN orders o ON r.order_id = o.id
    WHERE r.id = ?`;

    return this.connection.query(query, [refund_id]);
  }

  /**
   * Performs the SQL query to get a refund by order id.
   *
   * @param {number} order_id The id of the order to query.
   * @return {Promise} The query result.
   */
  async getByOrderId(order_id) {
    const query = `SELECT
      r.id,
      r.order_id,
      o.order_number,
      r.amount,
      r.reason,
      r.created_at
    FROM refunds r
    LEFT JOIN orders o ON r.order_id = o.id
    WHERE r.order_id = ?`;

    return this.connection.query(query, [order_id]);
  }

  /**
   * Performs the SQL query to get all refund items by refund id.
   *
   * @param {number} refund_id The id of the refund to query.
   * @return {Promise} The query result.
   */
  async getItemsByRefundId(refund_id) {
    const query = `SELECT
      ri.id,
      ri.order_item_id,
      oi.product_id,
      p.title AS product_title,
      oi.variant_id,
      v.sku,
      ri.quantity,
      ri.amount
    FROM refund_items ri
    LEFT JOIN order_items oi ON ri.order_item_id = oi.id
    LEFT JOIN products p ON oi.product_id = p.id
    LEFT JOIN variants v ON oi.variant_id = v.id
    WHERE ri.refund_id = ?`;

    return this.connection.query(query, [refund_id]);
  }

  /**
   * Performs the SQL query to insert a refund.
   *
   * @param {object} refund The refund to store.
   * @return {Promise} The query result.
   */
  async create(refund) {
    const query = 'INSERT INTO refunds SET ?';
    return this.connection.query(query, [refund]);
  }

  /**
   * Performs the SQL query to insert a refund item.
   *
   * @param {object} refundItem The refund item to store.
   * @return {Promise} The query result.
   */
  async createItem(refundItem) {
    const query = 'INSERT INTO refund_items SET ?';
    return this.connection.query(query, [refundItem]);
  }
}

export default RefundDao;
