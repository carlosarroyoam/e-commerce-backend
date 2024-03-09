/**
 * AttributeDao class.
 */
class AttributeDao {
  /**
   * AttributeDao class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Performs the SQL query to get all attributes.
   *
   * @return {Promise} The query result.
   */
  async getAllByProductId() {
    const query = `SELECT
      id,
      title
    FROM attributes`;

    return this.connection.query(query);
  }
  /**
   * Performs the SQL query to get a attribute by its id.
   *
   * @param {number} attribute_id The id of the attribute to query.
   * @return {Promise} The query result.
   */
  async getById(attribute_id) {
    const query = `SELECT
      id,
      title,
      deleted_at
    FROM attributes
    WHERE id = ?`;

    return this.connection.query(query, [attribute_id]);
  }

  /**
   * Performs the SQL query to get a category by its title.
   *
   * @param {number} title The title of the category to query.
   * @return {Promise} The query result.
   */
  async getByTitle(title) {
    const query = `SELECT
      id,
      title,
      deleted_at
    FROM attributes
    WHERE title = ?`;

    return this.connection.query(query, [title]);
  }

  /**
   * Performs the SQL query to insert a attribute.
   *
   * @param {object} attribute The attribute to store.
   * @return {Promise} The query result.
   */
  async create(attribute) {
    const query = 'INSERT INTO attributes SET ?';

    return this.connection.query(query, [attribute]);
  }

  /**
   * Performs the SQL query to update a attribute.
   *
   * @param {object} attribute The attribute to update.
   * @param {number} attribute_id The id of the attribute to update.
   * @return {Promise} The query result.
   */
  async update(attribute, attribute_id) {
    const query = 'UPDATE attributes SET ? WHERE id = ? LIMIT 1';

    return this.connection.query(query, [attribute, attribute_id]);
  }

  /**
   * Performs the SQL query to delete a attribute.
   *
   * @param {number} attribute_id The id of the attribute to delete.
   * @return {Promise} The query result.
   */
  async deleteById(attribute_id) {
    const query = 'UPDATE attributes SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

    return this.connection.query(query, [attribute_id]);
  }

  /**
   * Performs the SQL query to restore a attribute.
   *
   * @param {number} attribute_id The id of the attribute to restore.
   * @return {Promise} The query result.
   */
  async restore(attribute_id) {
    const query = 'UPDATE attributes SET deleted_at = NULL WHERE id = ? LIMIT 1';

    return this.connection.query(query, [attribute_id]);
  }
}

export default AttributeDao;
