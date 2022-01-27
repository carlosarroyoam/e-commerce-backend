const objectUtils = require('../../shared/utils/object.utils');

/**
 * Maps a admin object to a customer dto object.
 *
 * @param {object} customer The customer object to map.
 * @return {object} The admin dto object.
 */
const toDto = (customer) => {
  return {
    id: customer.id,
    user_id: customer.user_id,
    first_name: customer.first_name,
    last_name: customer.last_name,
    email: customer.email,
    password: customer.password,
    addresses: customer.addresses,
    created_at: customer.created_at,
    updated_at: customer.updated_at,
    deleted_at: customer.deleted_at,
  };
};

/**
 * Maps a adminDto object to a customer database entity object.
 *
 * @param {object} customerDto The customer dto object to map.
 * @return {object} The admin database entity object.
 */
const toDatabaseEntity = (customerDto) => {
  const customerDbEntity = {
    user_id: customerDto.user_id,
  };

  const cleanedCustomerDbEntity = objectUtils.removeUndefined(customerDbEntity);

  return cleanedCustomerDbEntity;
};

module.exports = {
  toDto,
  toDatabaseEntity,
};
