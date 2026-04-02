/**
 * OrderDao class.
 */
class OrderDao {
  /**
   * OrderDao class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Performs the SQL query to get all orders.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @param {string} queryOptions.search The search criteria.
   * @param {number} queryOptions.customer_id The customer id to query.
   * @return {Promise} The query result.
   */
  async getAll({ page, size, sort, search, customer_id }) {
    let query = `SELECT
      o.id,
      o.order_number,
      o.customer_id,
      ca.street_name,
      ca.street_number,
      ca.locality,
      ca.state,
      ca.postal_code,
      os.title AS status,
      ops.title AS payment_status,
      o.subtotal,
      o.tax_total,
      o.shipping_total,
      o.total,
      o.notes,
      o.created_at,
      o.updated_at
    FROM orders o
    LEFT JOIN order_statuses os ON o.status_id = os.id
    LEFT JOIN order_payment_statuses ops ON o.payment_status_id = ops.id
    LEFT JOIN customer_addresses ca ON o.shipping_address_id = ca.id
    WHERE 1`;

    if (customer_id) {
      query += ` AND o.customer_id = ?`;
    }

    if (search) {
      query += ` AND o.order_number LIKE ?`;
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

    const params = customer_id ? [customer_id, `%${search}%`] : [`%${search}%`];
    return this.connection.query(query, params);
  }

  /**
   * Performs the SQL query to count all orders.
   *
   * @param {object} queryOptions The query options.
   * @param {string} queryOptions.search The search criteria.
   * @param {number} queryOptions.customer_id The customer id to query.
   * @return {Promise} The query result.
   */
  async count({ search, customer_id }) {
    let query = `SELECT COUNT(*) AS count FROM orders o WHERE 1`;

    if (customer_id) {
      query += ` AND o.customer_id = ?`;
    }

    if (search) {
      query += ` AND o.order_number LIKE ?`;
    }

    const params = customer_id ? [customer_id, `%${search}%`] : [`%${search}%`];
    return this.connection.query(query, params);
  }

  /**
   * Performs the SQL query to get an order by its id.
   *
   * @param {number} order_id The id of the order to query.
   * @return {Promise} The query result.
   */
  async getById(order_id) {
    const query = `SELECT
      o.id,
      o.order_number,
      o.customer_id,
      ca.street_name,
      ca.street_number,
      ca.apartament_number,
      ca.sublocality,
      ca.locality,
      ca.state,
      ca.postal_code,
      ca.country,
      ca.phone_number,
      os.id AS status_id,
      os.title AS status,
      ops.id AS payment_status_id,
      ops.title AS payment_status,
      o.subtotal,
      o.tax_total,
      o.shipping_total,
      o.total,
      o.notes,
      o.created_at,
      o.updated_at
    FROM orders o
    LEFT JOIN order_statuses os ON o.status_id = os.id
    LEFT JOIN order_payment_statuses ops ON o.payment_status_id = ops.id
    LEFT JOIN customer_addresses ca ON o.shipping_address_id = ca.id
    WHERE o.id = ?`;

    return this.connection.query(query, [order_id]);
  }

  /**
   * Performs the SQL query to get an order by its order number.
   *
   * @param {string} orderNumber The order number to query.
   * @return {Promise} The query result.
   */
  async getByOrderNumber(orderNumber) {
    const query = `SELECT
      o.id,
      o.order_number,
      o.customer_id,
      os.id AS status_id,
      ops.id AS payment_status_id,
      o.subtotal,
      o.tax_total,
      o.shipping_total,
      o.total,
      o.created_at
    FROM orders o
    LEFT JOIN order_statuses os ON o.status_id = os.id
    LEFT JOIN order_payment_statuses ops ON o.payment_status_id = ops.id
    WHERE o.order_number = ?`;

    return this.connection.query(query, [orderNumber]);
  }

  /**
   * Performs the SQL query to get all order items by order id.
   *
   * @param {number} order_id The id of the order to query.
   * @return {Promise} The query result.
   */
  async getItemsByOrderId(order_id) {
    const query = `SELECT
      oi.id,
      oi.product_id,
      p.title AS product_title,
      oi.variant_id,
      v.sku,
      oi.quantity,
      oi.unit_price,
      oi.total,
      GROUP_CONCAT(DISTINCT CONCAT(a.title, ': ', vav.value) SEPARATOR ', ') AS variant_name
    FROM order_items oi
    LEFT JOIN products p ON oi.product_id = p.id
    LEFT JOIN variants v ON oi.variant_id = v.id
    LEFT JOIN variant_attribute_values vav ON v.id = vav.variant_id
    LEFT JOIN attributes a ON vav.attribute_id = a.id
    WHERE oi.order_id = ?
    GROUP BY oi.id`;

    return this.connection.query(query, [order_id]);
  }

  /**
   * Performs the SQL query to get the status history of an order by its id.
   *
   * @param {number} order_id The id of the order to query.
   * @return {Promise} The query result.
   */
  async getStatusHistoryByOrderId(order_id) {
    const query = `SELECT
      osh.id,
      osh.status_id,
      os.title AS status,
      osh.notes,
      osh.changed_at
    FROM order_status_history osh
    LEFT JOIN order_statuses os ON osh.status_id = os.id
    WHERE osh.order_id = ?
    ORDER BY osh.changed_at ASC`;

    return this.connection.query(query, [order_id]);
  }

  /**
   * Performs the SQL query to get the shipment of an order by its id.
   *
   * @param {number} order_id The id of the order to query.
   * @return {Promise} The query result.
   */
  async getShipmentByOrderId(order_id) {
    const query = `SELECT
      s.id,
      s.carrier_id,
      c.name AS carrier,
      s.tracking_number,
      s.shipped_at,
      s.delivered_at
    FROM shipments s
    LEFT JOIN carriers c ON s.carrier_id = c.id
    WHERE s.order_id = ?`;

    return this.connection.query(query, [order_id]);
  }

  /**
   * Performs the SQL query to insert an order.
   *
   * @param {object} order The order to store.
   * @return {Promise} The query result.
   */
  async create(order) {
    const query = 'INSERT INTO orders SET ?';
    return this.connection.query(query, [order]);
  }

  /**
   * Performs the SQL query to insert an order item.
   *
   * @param {object} orderItem The order item to store.
   * @return {Promise} The query result.
   */
  async createItem(orderItem) {
    const query = 'INSERT INTO order_items SET ?';
    return this.connection.query(query, [orderItem]);
  }

  /**
   * Performs the SQL query to insert an order status history entry.
   *
   * @param {object} statusHistory The order status history entry to store.
   * @return {Promise} The query result.
   */
  async createStatusHistory(statusHistory) {
    const query = 'INSERT INTO order_status_history SET ?';
    return this.connection.query(query, [statusHistory]);
  }

  /**
   * Performs the SQL query to update an order status by its id.
   *
   * @param {number} order_id The id of the order to update.
   * @param {number} status_id The status id to update.
   * @return {Promise} The query result.
   */
  async updateStatus(order_id, status_id) {
    const query = 'UPDATE orders SET status_id = ? WHERE id = ?';
    return this.connection.query(query, [status_id, order_id]);
  }

  /**
   * Performs the SQL query to update an order payment status by its id.
   *
   * @param {number} order_id The id of the order to update.
   * @param {number} payment_status_id The payment status id to update.
   * @return {Promise} The query result.
   */
  async updatePaymentStatus(order_id, payment_status_id) {
    const query = 'UPDATE orders SET payment_status_id = ? WHERE id = ?';
    return this.connection.query(query, [payment_status_id, order_id]);
  }

  /**
   * Performs the SQL query to insert a shipment.
   *
   * @param {object} shipment The shipment to store.
   * @return {Promise} The query result.
   */
  async createShipment(shipment) {
    const query = 'INSERT INTO shipments SET ?';
    return this.connection.query(query, [shipment]);
  }

  /**
   * Performs the SQL query to get a refund by order id.
   *
   * @param {number} order_id The id of the order to query.
   * @return {Promise} The query result.
   */
  async getRefundByOrderId(order_id) {
    const query = `SELECT
      r.id,
      r.amount,
      r.reason,
      r.created_at
    FROM refunds r
    WHERE r.order_id = ?`;

    return this.connection.query(query, [order_id]);
  }

  /**
   * Performs the SQL query to get all refund items by refund id.
   *
   * @param {number} refund_id The id of the refund to query.
   * @return {Promise} The query result.
   */
  async getRefundItemsByRefundId(refund_id) {
    const query = `SELECT
      ri.id,
      ri.order_item_id,
      oi.product_id,
      oi.variant_id,
      ri.quantity,
      ri.amount
    FROM refund_items ri
    LEFT JOIN order_items oi ON ri.order_item_id = oi.id
    WHERE ri.refund_id = ?`;

    return this.connection.query(query, [refund_id]);
  }

  /**
   * Performs the SQL query to insert a refund.
   *
   * @param {object} refund The refund to store.
   * @return {Promise} The query result.
   */
  async createRefund(refund) {
    const query = 'INSERT INTO refunds SET ?';
    return this.connection.query(query, [refund]);
  }

  /**
   * Performs the SQL query to insert a refund item.
   *
   * @param {object} refundItem The refund item to store.
   * @return {Promise} The query result.
   */
  async createRefundItem(refundItem) {
    const query = 'INSERT INTO refund_items SET ?';
    return this.connection.query(query, [refundItem]);
  }

  /**
   * Performs the SQL query to get the stock of a variant by its id.
   *
   * @param {number} variant_id The id of the variant to query.
   * @return {Promise} The query result.
   */
  async getVariantStock(variant_id) {
    const query = 'SELECT quantity_on_stock FROM variants WHERE id = ?';
    return this.connection.query(query, [variant_id]);
  }

  /**
   * Performs the SQL query to update the stock of a variant by its id.
   *
   * @param {number} variant_id The id of the variant to update.
   * @param {number} quantity The quantity to update.
   * @return {Promise} The query result.
   */
  async updateVariantStock(variant_id, quantity) {
    const query = 'UPDATE variants SET quantity_on_stock = ? WHERE id = ?';
    return this.connection.query(query, [quantity, variant_id]);
  }
}

export default OrderDao;
