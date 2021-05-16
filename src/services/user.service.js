class UserService {
  constructor({ userRepository, exceptions }) {
    this._userRepository = userRepository;
    this._exceptions = exceptions;
  }

  async findAll() {
    const users = await this._userRepository.findAll();

    if (users.length < 1) {
      throw new this._exceptions.ModelNotFoundException('No users registered', 'user');
    }

    return users;
  }

  async find(id) {
    const user = await this._userRepository.find(id);

    if (!user) {
      throw new this._exceptions.ModelNotFoundException(`User with id: ${id} was not found`, 'user');
    }

    return user;
  }

  async store(userDto) {
    const emailIsUsed = await this._userRepository.findByEmail(userDto.email);

    if (emailIsUsed) {
      throw new this._exceptions.EmailAddressNotAvailableException(`The email address: ${userDto.email} is already in use`);
    }

    const createdUserId = await this._userRepository.store(userDto);

    const createdUser = await this._userRepository.find(createdUserId);

    return createdUser;
  }

  async update(userId, userDto) {
    const user = await this._userRepository.find(userId);

    if (!user) {
      throw new this._exceptions.ModelNotFoundException(`User with id: ${userId} was not found`, 'user');
    }

    const updatedUserAffectedRows = await this._userRepository.update(userId, userDto);

    if (updatedUserAffectedRows < 1) {
      throw new Error('User was not updated');
    }

    const updatedUser = await this._userRepository.find(userId);

    return updatedUser;
  }
}

module.exports = UserService;
