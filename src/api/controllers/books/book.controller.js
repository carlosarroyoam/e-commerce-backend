class BookController {
  constructor({ bookService }) {
    this._bookService = bookService;
  }

  index() {
    return this._bookService.findAll();
  }
}

module.exports = BookController;
