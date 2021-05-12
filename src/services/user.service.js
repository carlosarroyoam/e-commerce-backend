class UserService {
  constructor({ userRepository, exceptions }) {
    this._userRepository = userRepository;
    this._exceptions = exceptions;
  }

  async findAll() {
    const users = await this._userRepository.findAll();

    if (users.length < 1) {
      throw new this._exceptions.ResourceNotFoundError('No users registered', 'user');
    }

    return users;
  }

  async find(id) {
    const user = await this._userRepository.find(id);

    if (user.length < 1) {
      throw new this._exceptions.ResourceNotFoundError(`User with id: ${id} was not found`, 'user');
    }

    return user;
  }

  async store(user) {
    const userByEmail = await this._userRepository.findByEmail(user.email);

    if (userByEmail.length > 0) {
      throw new this._exceptions.EmailAddressNotAvailableError(`The email address: ${user.email} is already in use`);
    }

    const createdUserId = await this._userRepository.store(user);

    const createdUser = await this._userRepository.find(createdUserId);

    return createdUser;
  }

  async update(userId, userDto) {
    const user = await this._userRepository.find(userId);

    if (user.length < 1) {
      throw new this._exceptions.ResourceNotFoundError(`User with id: ${userId} was not found`, 'user');
    }

    const updatedUserResult = await this._userRepository.update(userId, userDto);

    if (updatedUserResult.affectedRows < 1) {
      throw new Error('User was not updated');
    }

    const updatedUser = await this._userRepository.find(userId);

    return updatedUser;
  }
}

module.exports = UserService;
