/**
 * Maps a admin object to a customer dto object.
 *
 * @param {object} customer
 * @return {object} The admin dto object
 */
const toDto = (customer) => {
  return {
    id: customer.id,
    user_id: customer.user_id,
    first_name: customer.first_name,
    last_name: customer.last_name,
    email: customer.email,
    password: customer.password,
    created_at: customer.created_at,
    updated_at: customer.updated_at,
    deleted_at: customer.deleted_at,
  };
};

/**
 * Maps a adminDto object to a customer database entity object.
 *
 * @param {object} customerDto
 * @return {object} The admin database entity object
 */
const toDatabaseEntity = (customerDto) => {
  const customerDbEntity = {
    user_id: customerDto.user_id,
  };

  Object.keys(customerDbEntity).forEach(
    (key) => customerDbEntity[key] === undefined && delete customerDbEntity[key]
  );

  Object.freeze(customerDbEntity);

  return customerDbEntity;
};

module.exports = {
  toDto,
  toDatabaseEntity,
};
