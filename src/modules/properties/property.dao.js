/**
 * PropertyDao class.
 */
class PropertyDao {
  /**
   * PropertyDao class constructor.
   *
   * @param {*} connection The database connection object.
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Performs the SQL query to get all properties.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * * @return {Promise} The query result.
   */
  async getAll({ page, size, sort }) {
    let query = `SELECT
      id,
      title,
      deleted_at
    FROM properties
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
   * Performs the SQL query to count all properties.
   *
   * @return {Promise} The query result.
   */
  async count() {
    const query = 'SELECT count(id) as count FROM properties';

    return this.connection.query(query);
  }

  /**
   * Performs the SQL query to get a property by its id.
   *
   * @param {number} property_id The id of the property to query.
   * @return {Promise} The query result.
   */
  async getById(property_id) {
    const query = `SELECT
      id,
      title,
      deleted_at
    FROM properties
    WHERE id = ?`;

    return this.connection.query(query, [property_id]);
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
    FROM properties
    WHERE title = ?`;

    return this.connection.query(query, [title]);
  }

  /**
   * Performs the SQL query to insert a property.
   *
   * @param {object} property The property to store.
   * @return {Promise} The query result.
   */
  async create(property) {
    const query = 'INSERT INTO properties SET ?';

    return this.connection.query(query, [property]);
  }

  /**
   * Performs the SQL query to update a property.
   *
   * @param {object} property The property to update.
   * @param {number} property_id The id of the property to update.
   * @return {Promise} The query result.
   */
  async update(property, property_id) {
    const query = 'UPDATE properties SET ? WHERE id = ? LIMIT 1';

    return this.connection.query(query, [property, property_id]);
  }

  /**
   * Performs the SQL query to delete a property.
   *
   * @param {number} property_id The id of the property to delete.
   * @return {Promise} The query result.
   */
  async deleteById(property_id) {
    const query = 'UPDATE properties SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? LIMIT 1';

    return this.connection.query(query, [property_id]);
  }

  /**
   * Performs the SQL query to restore a property.
   *
   * @param {number} property_id The id of the property to restore.
   * @return {Promise} The query result.
   */
  async restore(property_id) {
    const query = 'UPDATE properties SET deleted_at = NULL WHERE id = ? LIMIT 1';

    return this.connection.query(query, [property_id]);
  }
}

export default PropertyDao;
