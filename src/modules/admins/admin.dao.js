const USERABLE_TYPE = 'App/admin';

/**
* Performs the SQL query to get all non-deleted/active admin users.
*
* @returns {Promise}
*/
const getAll = async (connection) => {
  const query = `SELECT 
      adm.id,
      usr.id AS user_id,
      usr.first_name,
      usr.last_name,
      usr.email,
      adm.is_super,
      usr.created_at,
      usr.updated_at,
      usr.deleted_at
    FROM admin adm
    LEFT JOIN user usr ON adm.id = usr.userable_id
    WHERE usr.userable_type = '${USERABLE_TYPE}' AND usr.deleted_at IS NULL`;

  return connection.query(query);
}

/**
* Performs the SQL query to get all deleted/inactive admin users.
*
* @returns {Promise}
*/
const getTrashed = async (connection) => {
  const query = `SELECT 
      adm.id,
      usr.id AS user_id,
      usr.first_name,
      usr.last_name,
      usr.email,
      adm.is_super,
      usr.created_at,
      usr.updated_at,
      usr.deleted_at
    FROM admin adm
    LEFT JOIN user usr ON adm.id = usr.userable_id
    WHERE usr.userable_type = '${USERABLE_TYPE}' AND usr.deleted_at IS NOT NULL`;

  return connection.query(query);
}

/**
* Performs the SQL query to get all users.
*
* @returns {Promise}
*/
const getAllWithTrashed = async (connection) => {
  const query = `SELECT 
      adm.id,
      usr.id AS user_id,
      usr.first_name,
      usr.last_name,
      usr.email,
      adm.is_super,
      usr.created_at,
      usr.updated_at,
      usr.deleted_at
    FROM admin adm
    LEFT JOIN user usr ON adm.id = usr.userable_id
    WHERE usr.userable_type = '${USERABLE_TYPE}'`;

  return connection.query(query);
}

/**
 * Performs the SQL query to get a non-deleted/active admin user by its id.
 *
 * @param {object} data
 * @returns {Promise}
 */
const getById = async ({ id }, connection) => {
  const query = `SELECT 
      adm.id,
      usr.id AS user_id,
      usr.first_name,
      usr.last_name,
      usr.email,
      adm.is_super,
      usr.created_at,
      usr.updated_at,
      usr.deleted_at
    FROM admin adm
    LEFT JOIN user usr ON adm.id = usr.userable_id
    WHERE usr.userable_type = '${USERABLE_TYPE}' AND usr.userable_id = ? AND usr.deleted_at IS NULL`;

  return connection.query(query, [id]);
}

/**
* Performs the SQL query to get a deleted/inactive admin user by its id.
*
 * @param {object} data
* @returns {Promise}
*/
const getTrashedById = async ({ id }, connection) => {
  const query = `SELECT 
      adm.id,
      usr.id AS user_id,
      usr.first_name,
      usr.last_name,
      usr.email,
      adm.is_super,
      usr.created_at,
      usr.updated_at,
      usr.deleted_at
    FROM admin adm
    LEFT JOIN user usr ON adm.id = usr.userable_id
    WHERE usr.userable_type = '${USERABLE_TYPE}' AND usr.userable_id = ? AND usr.deleted_at IS NOT NULL`;

  return connection.query(query, [id]);
}

/**
* Performs the SQL query to get a non-deleted/active admin user by its email address.
*
* @param {object} data
* @returns {Promise}
*/
const getByEmail = async ({ email }, connection) => {
  const query = `SELECT 
      adm.id,
      usr.id AS user_id,
      usr.first_name,
      usr.last_name,
      usr.email,
      adm.is_super,
      usr.created_at,
      usr.updated_at,
      usr.deleted_at
  FROM admin adm
  LEFT JOIN user usr ON adm.id = usr.userable_id
  WHERE usr.userable_type = '${USERABLE_TYPE}' AND usr.email = ? AND usr.deleted_at IS NULL`;

  return connection.query(query, [email]);
}

/**
* Performs the SQL query to get a admin user by its email address.
*
* @param {object} data
* @returns {Promise}
*/
const getByEmailWithTrashed = async ({ email }, connection) => {
  const query = `SELECT 
      adm.id,
      usr.id AS user_id,
      usr.first_name,
      usr.last_name,
      usr.email,
      adm.is_super,
      usr.created_at,
      usr.updated_at,
      usr.deleted_at       
    FROM admin adm
    LEFT JOIN user usr ON adm.id = usr.userable_id
    WHERE usr.userable_type = '${USERABLE_TYPE}' AND usr.email = ?`;

  return connection.query(query, [email]);
}

/**
* Performs the SQL query to insert a admin user.
*
* @param {object} admin
* @returns {Promise}
*/
const create = async (admin, connection) => {
  const query = 'INSERT INTO admin SET ?';

  return connection.query(query, [admin]);
}

/**
* Performs the SQL query to update a admin user.
*
* @param {object} admin
* @param {number} adminId
* @returns {Promise}
*/
const update = async (admin, adminId, connection) => {
  const query = 'UPDATE admin SET ? WHERE id = ? LIMIT 1';

  return connection.query(query, [admin, adminId]);
}

module.exports = {
  getAll,
  getTrashed,
  getAllWithTrashed,
  getById,
  getTrashedById,
  getByEmail,
  getByEmailWithTrashed,
  create,
  update,
};
