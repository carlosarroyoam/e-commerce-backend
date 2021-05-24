class BookService {
  constructor({ bookRepository, exceptions }) {
    this._bookRepository = bookRepository;
    this._exceptions = exceptions;
  }

  async findAll() {
    const books = await this._bookRepository.findAll();
    if (books.length < 1) {
      throw new this._exceptions.NoResourcesInDatabaseError({ name: 'books' });
    }

    return books;
  }
}

module.exports = BookService;
