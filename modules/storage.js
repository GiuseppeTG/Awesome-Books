export default class Store {
  static getBooks = () => {
    let books = [];
    if (localStorage.getItem('books') === null) {
      return books;
    }
    books = JSON.parse(localStorage.getItem('books'));
    return books;
  }

  static addBook = (book) => {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook = (ID) => {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.id === Number(ID)) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static generateId = () => Math.floor(Math.random() * 100000000);
}