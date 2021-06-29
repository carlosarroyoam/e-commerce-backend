/* eslint-disable class-methods-use-this */
class AdminMapper {
  toDto(admin) {
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

  toDatabaseEntity(adminDto) {
    const adminDbEntity = {
      is_super: adminDto.is_super,
    };

    Object.keys(adminDbEntity).forEach(
      (key) => adminDbEntity[key] === undefined && delete adminDbEntity[key],
    );

    return adminDbEntity;
  }
}

module.exports = AdminMapper;
