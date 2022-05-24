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
    <td><button class="remove-btn">Remove</button></td> 
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
  //method gets the book from local storage
  static getBooks() {
    let books = [];
    if (localStorage.getItem('books') === null) {
      return books;
    }
    books = JSON.parse(localStorage.getItem('books'));

    return books;
  }

  //method adds the book
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  //method Remove the Bood
  static removeBook(title) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  //method generated ID
  static generateId(){
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
});

document.querySelector('#list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  const text = e.target.parentElement.previousElementSibling.previousElementSibling;
  Store.removeBook(text.textContent);
});

// init app
function init() {
  list.innerHTML = '';
  Store.getBooks().forEach((book) => UI.getAllBooks(book));
}
init();
