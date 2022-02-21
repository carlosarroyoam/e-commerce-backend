const objectUtils = require('../../shared/utils/object.utils');

/**
 * Maps a admin object to a admin dto object.
 *
 * @param {object} admin The admin object to map.
 * @return {object} The admin dto object.
 */
function toDto(admin) {
  return {
    id: admin.id,
    user_id: admin.user_id,
    first_name: admin.first_name,
    last_name: admin.last_name,
    email: admin.email,
    password: admin.password,
    is_super: admin.is_super,
    created_at: admin.created_at,
    updated_at: admin.updated_at,
    deleted_at: admin.deleted_at,
  };
}

/**
 * Maps a admin dto object to a admin database entity object.
 *
 * @param {object} adminDto The admin dto object to map.
 * @return {object} The admin database entity object.
 */
function toDatabaseEntity(adminDto) {
  const adminDbEntity = {
    is_super: adminDto.is_super,
    user_id: adminDto.user_id,
  };

  const cleanedAdminDbEntity = objectUtils.removeUndefined(adminDbEntity);

  return cleanedAdminDbEntity;
}

module.exports = {
  toDto,
  toDatabaseEntity,
};
