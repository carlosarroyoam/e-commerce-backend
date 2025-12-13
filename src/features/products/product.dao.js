/**
 * ProductDao class.
 */
class ProductDao {
  /**
   * ProductDao class constructor.
   *
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Performs the SQL query to get all customer users.
   *
   * @param {object} queryOptions The query options.
   * @param {number} queryOptions.page The query page.
   * @param {number} queryOptions.size The query size.
   * @param {string} queryOptions.sort The order for the results.
   * @param {string} queryOptions.search The search criteria.
   * @return {Promise} The query result.
   */
  async getAll({ page, size, sort, search }) {
    let query = `SELECT
      p.id,
      p.title,
      p.slug,
      p.description,
      p.featured,
      p.active,
      c.title AS category,
      p.created_at,
      p.updated_at,
      p.deleted_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1`;

    if (search) {
      query += ` AND MATCH(p.title, p.description) AGAINST(${this.connection.escape(
        search
      )} IN BOOLEAN MODE)`;
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

    return this.connection.query(query);
  }

  /**
   * Performs the SQL query to count all products.
   *
   * @param {object} queryOptions The query options.
   * @param {string} queryOptions.search The search criteria.
   * @return {Promise} The query result.
   */
  async count({ search }) {
    let query = `SELECT
        count(id) as count
    FROM products p
    WHERE 1`;

    if (search) {
      query += ` AND MATCH(p.title, p.description) AGAINST(${this.connection.escape(
        search
      )} IN BOOLEAN MODE)`;
    }

    return this.connection.query(query);
  }

  /**
   * Performs the SQL query to get a product by its id.
   *
   * @param {number} product_id The id of the product to query.
   * @return {Promise} The query result.
   */
  async getById(product_id) {
    const query = `SELECT
      p.id,
      p.title,
      p.slug,
      p.description,
      p.featured,
      p.active,
      c.title AS category,
      p.created_at,
      p.updated_at,
      p.deleted_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?`;

    return this.connection.query(query, [product_id]);
  }

  /**
   * Performs the SQL query to get a product by its slug.
   *
   * @param {string} slug The slug of the product to query.
   * @return {Promise} The query result.
   */
  async getBySlug(slug) {
    const query = `SELECT
      p.id,
      p.title,
      p.slug,
      p.description,
      p.featured,
      p.active,
      c.title AS category,
      p.created_at,
      p.updated_at,
      p.deleted_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ?`;

    return this.connection.query(query, [slug]);
  }

  /**
   * Performs the SQL query to get all product properties by its id.
   *
   * @param {number} product_id The id of the product to query.
   * @return {Promise} The query result.
   */
  async findPropertiesByProductId(product_id) {
    const query = `SELECT
      a.id,
      a.title,
      ppv.value
    FROM product_property_values ppv
    LEFT JOIN products p ON ppv.product_id = p.id
    LEFT JOIN properties a ON ppv.property_id = a.id
    WHERE p.id =  ?`;

    return this.connection.query(query, [product_id]);
  }

  /**
   * Performs the SQL query to insert a product.
   *
   * @param {object} product The product to store.
   * @return {Promise} The query result.
   */
  async create(product) {
    const query = 'INSERT INTO products SET ?';

    return this.connection.query(query, [product]);
  }
}

export default ProductDao;
