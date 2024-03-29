/**
 * CustomerAddressDao class.
 */
class CustomerAddressDao {
  /**
   * CustomerAddressDao class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Performs the SQL query to get a customer address by customer_id and
   * address_id.
   *
   * @param {number} customer_id The id of the customer to query.
   * @param {number} address_id The id of the address to query.
   * @return {Promise} The query result.
   */
  async getById(customer_id, address_id) {
    const query = `SELECT
      csa.id,
      csa.street_name,
      csa.street_number,
      csa.apartament_number,
      csa.sublocality,
      csa.locality,
      csa.state,
      csa.postal_code,
      csa.phone_number,
      cus.id as customer_id
    FROM customer_addresses csa
    LEFT JOIN customers cus ON csa.customer_id = cus.id
    WHERE cus.id = ?
    AND csa.id = ?`;

    return this.connection.query(query, [customer_id, address_id]);
  }

  /**
   * Performs the SQL query to get all customer addresses by the customer id.
   *
   * @param {number} customer_id The id of the customer user to query.
   * @return {Promise} The query result.
   */
  async getByCustomerId(customer_id) {
    const query = `SELECT
      csa.id,
      csa.street_name,
      csa.street_number,
      csa.apartament_number,
      csa.sublocality,
      csa.locality,
      csa.state,
      csa.postal_code,
      csa.phone_number,
      cus.id as customer_id
    FROM customer_addresses csa
    LEFT JOIN customers cus ON csa.customer_id = cus.id
    WHERE cus.id = ?`;

    return this.connection.query(query, [customer_id]);
  }

  /**
   * Performs the SQL query to insert a customer address.
   *
   * @param {object} customerAddress The customer address to store.
   * @return {Promise} The query result.
   */
  async create(customerAddress) {
    const query = 'INSERT INTO customer_addresses SET ?';

    return this.connection.query(query, [customerAddress]);
  }

  /**
   * Performs the SQL query to update a customer address.
   *
   * @param {object} customer_address The customer address to update.
   * @param {number} address_id The id of the customer address to update.
   * @return {Promise} The query result.
   */
  async update(customer_address, address_id) {
    const query = 'UPDATE customer_addresses SET ? WHERE id = ? LIMIT 1';

    return this.connection.query(query, [customer_address, address_id]);
  }

  /**
   * Performs the SQL query to delete a customer address.
   *
   * @param {number} address_id The id of the address to delete.
   * @return {Promise} The query result.
   */
  async deleteById(address_id) {
    const query = 'DELETE FROM customer_addresses WHERE id = ? LIMIT 1';

    return this.connection.query(query, [address_id]);
  }
}

export default CustomerAddressDao;
