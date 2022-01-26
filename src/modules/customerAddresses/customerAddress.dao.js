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
    FROM customer_shipping_addresses csa
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
    FROM customer_shipping_addresses csa
    LEFT JOIN customers cus ON csa.customer_id = cus.id
    WHERE csa.id = ?
    AND cus.id = ?`;

  return connection.query(query, [customer_id, address_id]);
}

module.exports = {
  getByCustomerId,
  getById,
};
