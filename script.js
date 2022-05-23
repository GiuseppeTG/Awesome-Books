
class Book {
  constructor(title, author) {
  this.title = title;
  this.author = author;
  }
}



class UI {
  static displayBooks() {
    const books = Store.getBooks();
  }
}



class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}



document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;

  const book = new Book(title, author);

  console.log(book);

  Store.addBook(book);

})

console.log(localStorage.getItem('books'));

