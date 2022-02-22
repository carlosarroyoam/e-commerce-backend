/**
 * Performs the SQL query to get all categories.
 *
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function getAll({ skip = 0, limit = 50, sort = 'id' }, connection) {
  let query = `SELECT
      id,
      title
    FROM categories`;

  if (sort) {
    let order = 'ASC';

    if (sort.charAt(0) === '-') {
      order = 'DESC';
      sort = sort.substring(1);
    }

    query += ` ORDER BY ${connection.escapeId(sort)} ${order}`;
  }

  query += ` LIMIT ${connection.escape(skip)}, ${connection.escape(limit)}`;

  return connection.query(query);
}

/**
 * Performs the SQL query to get a category by its id.
 *
 * @param {number} category_id The id of the category to query.
 * @param {*} connection The database connection number.
 * @return {Promise} The query result.
 */
async function getById(category_id, connection) {
  const query = `SELECT
      id,
      title
    FROM categories
    WHERE id = ?`;

  return connection.query(query, [category_id]);
}

/**
 * Performs the SQL query to get a category by its title.
 *
 * @param {number} title The title of the category to query.
 * @param {*} connection The database connection number.
 * @return {Promise} The query result.
 */
async function getByTitle(title, connection) {
  const query = `SELECT
      id,
      title
    FROM categories
    WHERE title = ?`;

  return connection.query(query, [title]);
}

/**
 * Performs the SQL query to insert a category.
 *
 * @param {object} category The category to store.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function create(category, connection) {
  const query = 'INSERT INTO categories SET ?';

  return connection.query(query, [category]);
}

/**
 * Performs the SQL query to update a category.
 *
 * @param {object} category The category to update.
 * @param {number} category_id The id of the category.
 * @param {*} connection The database connection object.
 * @return {Promise} The query result.
 */
async function update(category, category_id, connection) {
  const query = 'UPDATE categories SET ? WHERE id = ? LIMIT 1';

  return connection.query(query, [category, category_id]);
}

module.exports = {
  getAll,
  getById,
  getByTitle,
  create,
  update,
};
