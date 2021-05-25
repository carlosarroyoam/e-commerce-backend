class UserService {
  constructor({ userRepository, exceptions, bcrypt }) {
    this._userRepository = userRepository;
    this._exceptions = exceptions;
    this._bcrypt = bcrypt;
  }

  async findAll() {
    const users = await this._userRepository.findAll();
    if (users.length < 1) {
      throw new this._exceptions.NoResourcesInDatabaseError({ resourceName: 'users' });
    }

    return users;
  }

  async find(id) {
    const user = await this._userRepository.findById(id);
    if (!user) {
      throw new this._exceptions.ResourseNotFoundError({ resourceName: 'user' });
    }

    return user;
  }

  async store(userDto) {
    const emailIsUsed = await this._userRepository.findByEmail(userDto.email);
    if (emailIsUsed) {
      throw new this._exceptions.EmailAlreadyTakenError({ email: userDto.email });
    }

    const passwordHash = await this._bcrypt.hashPassword(userDto.password);

    const createdUserId = await this._userRepository.store({ ...userDto, password: passwordHash });

    const createdUser = await this._userRepository.findById(createdUserId);

    return createdUser;
  }

  async update(userId, userDto) {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new this._exceptions.ResourseNotFoundError({ resourceName: 'user' });
    }

    let password;
    if (userDto.password) {
      password = await this._bcrypt.hashPassword(userDto.password);
    }

    const affectedRows = await this._userRepository.update(userId, { ...userDto, password });
    if (affectedRows < 1) {
      throw new Error('User was not updated');
    }

    const updatedUser = await this._userRepository.findById(userId);

    return updatedUser;
  }

  async delete(userId) {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new this._exceptions.ResourseNotFoundError({ resourceName: 'user' });
    }

    const affectedRows = await this._userRepository.delete(userId);
    if (affectedRows < 1) {
      throw new Error('User was not deleted');
    }

    return userId;
  }

  async restore(userId) {
    const restoredUserAffectedRows = await this._userRepository.restore(userId);

    if (restoredUserAffectedRows < 1) {
      throw new Error('User was not restored');
    }

    return userId;
  }
}

module.exports = UserService;
