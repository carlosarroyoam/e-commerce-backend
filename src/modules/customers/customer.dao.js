/**
 * Performs the SQL query to get all customer users.
 *
 * @param {any} connection
 * @return {Promise}
 */
async function getAll({ skip = 0, limit = 10, order_by = 'id', user_status, search }, connection) {
  let query = `SELECT 
        cus.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM customers cus
    LEFT JOIN users usr ON cus.id = usr.id
    WHERE 1`;

  if (user_status) {
    if (user_status === 'active') {
      query += ' AND usr.deleted_at IS NULL';
    } else {
      query += ' AND usr.deleted_at IS NOT NULL';
    }
  }

  if (search) {
    query += ` AND MATCH(first_name, last_name) AGAINST("${connection.escape(
      search
    )}*" IN BOOLEAN MODE)`;
  }

  if (order_by) {
    let order = 'ASC';

    if (order_by.charAt(0) === '-') {
      order = 'DESC';
      order_by = order_by.substring(1);
    }

    query += ` ORDER BY ${connection.escapeId(order_by)} ${order}`;
  }

  query += ` LIMIT ${connection.escape(skip)}, ${connection.escape(limit)}`;

  return connection.query(query);
}

/**
 * Performs the SQL query to get a non-deleted/active customer user by its id.
 *
 * @param {number} customer_id
 * @param {any} connection
 * @return {Promise}
 */
async function getById(customer_id, connection) {
  const query = `SELECT 
        cus.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM customers cus
    LEFT JOIN users usr ON cus.user_id = usr.id
    WHERE cus.id = ?`;

  return connection.query(query, [customer_id]);
}

/**
 * Performs the SQL query to get a non-deleted/active customer user by its email address.
 *
 * @param {string} email
 * @param {any} connection
 * @return {Promise}
 */
async function getByEmail(email, connection) {
  const query = `SELECT 
        cus.id,
        usr.id AS user_id,
        usr.first_name,
        usr.last_name,
        usr.email,
        usr.created_at,
        usr.updated_at,
        usr.deleted_at
    FROM customers cus
    LEFT JOIN users usr ON cus.user_id = usr.id
    WHERE usr.email = ?`;

  return connection.query(query, [email]);
}

/**
 * Performs the SQL query to insert a customer user.
 *
 * @param {object} customer
 * @param {any} connection
 * @return {Promise}
 */
async function create(customer, connection) {
  const query = 'INSERT INTO customers SET ?';

  return connection.query(query, [customer]);
}

/**
 * Performs the SQL query to update a customer user.
 *
 * @param {object} customer
 * @param {number} customer_id
 * @param {any} connection
 * @return {Promise}
 */
async function update(customer, customer_id, connection) {
  const query = 'UPDATE customers SET ? WHERE id = ? LIMIT 1';

  return connection.query(query, [customer, customer_id]);
}

module.exports = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
};
