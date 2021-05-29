class BookService {
  constructor({ bookRepository, exceptions, logger }) {
    this._bookRepository = bookRepository;
    this._exceptions = exceptions;
    this._logger = logger.instance;
  }

  async findAll() {
    try {
      const books = await this._bookRepository.findAll();
      if (books.length < 1) {
        throw new this._exceptions.NoResourcesInDatabaseError({ resourceName: 'books' });
      }

      return books;
    } catch (err) {
      this._logger.log({
        level: 'error',
        message: err.message,
        meta: err,
      });

      throw err;
    }
  }
}

module.exports = BookService;
