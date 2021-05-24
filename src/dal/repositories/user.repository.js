class UserRepository {
  constructor({ userDao, userMapper }) {
    this._userDao = userDao;
    this._userMapper = userMapper;
  }

  async findAll() {
    const users = await this._userDao.getAll();

    return users;
  }

  async findById(id) {
    const user = await this._userDao.getById(id);

    return user[0];
  }

  async findByEmail(email) {
    const user = await this._userDao.getByEmail(email);

    return user[0];
  }

  async store(user) {
    const userDatabaseEntity = this._userMapper.toDatabaseEntity(user);

    const createdUser = await this._userDao.create(userDatabaseEntity);

    return createdUser.insertId;
  }

  async update(userId, user) {
    const userDatabaseEntity = this._userMapper.toDatabaseEntity(user);

    Object.keys(userDatabaseEntity).forEach(
      (key) => userDatabaseEntity[key] === undefined && delete userDatabaseEntity[key],
    );

    const updatedUser = await this._userDao.update(userId, userDatabaseEntity);

    return updatedUser.affectedRows;
  }

  async delete(userId) {
    const deletedUser = await this._userDao.delete(userId);

    return deletedUser.affectedRows;
  }

  async restore(userId) {
    const restoredUser = await this._userDao.restore(userId);

    return restoredUser.affectedRows;
  }
}

module.exports = UserRepository;
