/**
 * Performs the SQL query to customer addresses by the customer id.
 *
 * @param {number} customer_id The id of the customer user to query.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getByCustomerId(customer_id, connection) {
  const query = `SELECT
      csa.id,
      csa.street_name,
      csa.street_number,
      csa.sublocality,
      csa.locality,
      csa.state,
      csa.postal_code
    FROM customer_addresses csa
    LEFT JOIN customers cus ON csa.customer_id = cus.id
    WHERE cus.id = ?`;

  return connection.query(query, [customer_id]);
}

/**
 * Performs the SQL query to customer addresses by customer_id and
 * address_id.
 *
 * @param {number} customer_id The id of the customer to query.
 * @param {number} address_id The id of the address to query.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getById(customer_id, address_id, connection) {
  const query = `SELECT
      csa.id,
      csa.street_name,
      csa.street_number,
      csa.sublocality,
      csa.locality,
      csa.state,
      csa.postal_code,
      cus.id as customer_id
    FROM customer_addresses csa
    LEFT JOIN customers cus ON csa.customer_id = cus.id
    WHERE cus.id = ?
    AND csa.id = ?`;

  return connection.query(query, [customer_id, address_id]);
}

/**
 * Performs the SQL query to insert a customer address.
 *
 * @param {object} customerAddress The customer address to store.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function create(customerAddress, connection) {
  const query = 'INSERT INTO customer_addresses SET ?';

  return connection.query(query, [customerAddress]);
}

/**
 * Performs the SQL query to update a customer address.
 *
 * @param {object} customer_address The customer address to update.
 * @param {number} address_id The id of the customer address to update.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function update(customer_address, address_id, connection) {
  const query = 'UPDATE customer_addresses SET ? WHERE id = ? LIMIT 1';

  return connection.query(query, [customer_address, address_id]);
}

/**
 * Performs the SQL query to delete a customer address.
 *
 * @param {number} address_id The id of the address to delete.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function deleteById(address_id, connection) {
  const query = 'DELETE FROM customer_addresses WHERE id = ? LIMIT 1';

  return connection.query(query, [address_id]);
}

module.exports = {
  getByCustomerId,
  getById,
  create,
  update,
  deleteById,
};
