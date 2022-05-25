class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

const list = document.querySelector('#list');

class UI {
  static getAllBooks(book) {
    const items = document.createElement('tr');
    items.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td><button data-id="${book.id}" class="remove-btn">Remove</button></td> 
    `;

    list.appendChild(items);
  }

  static displayBooks(book) {
    return this.getAllBooks(book);
  }

  static deleteBook(element) {
    if (element.classList.contains('remove-btn')) {
      element.parentElement.parentElement.remove();
    }
  }
}

class Store {
  static getBooks() {
    let books = [];
    if (localStorage.getItem('books') === null) {
      return books;
    }
    books = JSON.parse(localStorage.getItem('books'));

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(ID) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.id === Number(ID)) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static generateId() {
    return Math.floor(Math.random() * 100000000);
  }
}

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const book = new Book(title, author, Store.generateId());
  Store.addBook(book);
  UI.displayBooks(book);

  document.querySelector('#book-list-section').classList.add('active');
  document.querySelector('#form-section').classList.remove('active');
  document.querySelector('#contact-section').classList.remove('active');
});

document.querySelector('#list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  const ID = e.target.getAttribute('data-id');
  Store.removeBook(ID);
});

function init() {
  list.innerHTML = '';
  Store.getBooks().forEach((book) => UI.getAllBooks(book));
}
init();

// -----Navbar functionality-----//

const aBookList = document.querySelector('#a-book-list');
const aAddBook = document.querySelector('#a-add-book');
const aContact = document.querySelector('#a-contact');

aBookList.addEventListener('click', () => {
  document.querySelector('#book-list-section').classList.add('active');
  document.querySelector('#form-section').classList.remove('active');
  document.querySelector('#contact-section').classList.remove('active');
});
aAddBook.addEventListener('click', () => {
  document.querySelector('#book-list-section').classList.remove('active');
  document.querySelector('#form-section').classList.add('active');
  document.querySelector('#contact-section').classList.remove('active');
});
aContact.addEventListener('click', () => {
  document.querySelector('#book-list-section').classList.remove('active');
  document.querySelector('#form-section').classList.remove('active');
  document.querySelector('#contact-section').classList.add('active');
});
