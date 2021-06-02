const { UserDao } = require('../dao');
const { UserMapper } = require('../../mappers');

class UserRepository {
  constructor(connection) {
    this._userDao = new UserDao(connection);
    this._userMapper = new UserMapper();
  }

  async findAll() {
    const [result] = await this._userDao.getAll();

    return result;
  }

  async findById(id) {
    const [result] = await this._userDao.getById(id);

    return result[0];
  }

  async findTrashedById(userId) {
    const [result] = await this._userDao.getTrashedById(userId);

    return result[0];
  }

  async findByEmail(email) {
    const [result] = await this._userDao.getByEmail(email);

    return result[0];
  }

  async findByEmailForLogin(email) {
    const [result] = await this._userDao.getByEmailForLogin(email);

    return result[0];
  }

  async findByEmailWithTrashed(email) {
    const [result] = await this._userDao.getByEmailWithTrashed(email);

    return result[0];
  }

  async store(user) {
    const userDbEntity = this._userMapper.toDatabaseEntity(user);

    const [result] = await this._userDao.create(userDbEntity);

    return result.insertId;
  }

  async update(userId, user) {
    const userDbEntity = this._userMapper.toDatabaseEntity(user);

    const [result] = await this._userDao.update(userId, userDbEntity);

    return result.affectedRows;
  }

  async delete(userId) {
    const [result] = await this._userDao.delete(userId);

    return result.affectedRows;
  }

  async restore(userId) {
    const [result] = await this._userDao.restore(userId);

    return result.affectedRows;
  }
}

module.exports = UserRepository;
