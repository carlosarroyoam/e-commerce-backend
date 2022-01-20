/**
 * Performs the SQL query to customer addresses by the customer id.
 *
 * @param {number} customer_id The id of the customer user to query.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getByCustomerId(customer_id, connection) {
  const query = `SELECT 
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

module.exports = {
  getByCustomerId,
};
