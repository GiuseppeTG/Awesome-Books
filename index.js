import Book from './modules/book.js';
import UI from './modules/user-interface.js';
import Store from './modules/storage.js';
import getTime from './modules/day-time.js';

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

function init() {
  getTime();
  Store.getBooks().forEach((book) => UI.getAllBooks(book));
}
init();