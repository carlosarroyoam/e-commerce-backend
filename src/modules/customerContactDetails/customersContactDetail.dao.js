/**
 * Performs the SQL query to get customer contact details by the customer id.
 *
 * @param {number} customer_id The id of the customer user to query.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getByCustomerId(customer_id, connection) {
  const query = `SELECT 
      ccd.phone_number
    FROM customers cus
    LEFT JOIN customer_contact_details ccd ON cus.id = ccd.customer_id
    WHERE cus.id = ?`;

  return connection.query(query, [customer_id]);
}

module.exports = {
  getByCustomerId,
};
