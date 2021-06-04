/* eslint-disable class-methods-use-this */
class AdminMapper {
  toDto(admin) {
    return {
      id: admin.id,
      userId: admin.user_id,
      firstName: admin.first_name,
      lastName: admin.last_name,
      email: admin.email,
      password: admin.password,
      isSuper: admin.is_super,
      createdAt: admin.created_at,
      updatedAt: admin.updated_at,
      deletedAt: admin.deleted_at,
    };
  }

  toDatabaseEntity(adminDto) {
    const adminDbEntity = {
      is_super: adminDto.isSuper,
    };

    Object.keys(adminDbEntity).forEach(
      (key) => adminDbEntity[key] === undefined && delete adminDbEntity[key],
    );

    return adminDbEntity;
  }
}

module.exports = AdminMapper;
