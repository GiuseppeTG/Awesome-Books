
class Book {
  constructor(title, author) {
  this.title = title;
  this.author = author;
  }
}

const list = document.getElementById("list");


class UI {
  static getAllBooks(book) {
    const items = document.createElement('li');
    items.innerHTML = `
      ${book.title} <span>${book.author}</span><button class="remove-btn">Remove</button>
  `;
  list.appendChild(items);
  }


  static displayBooks() {
    console.log(Store.getBooks());
    return this.getAllBooks;
  }
}



class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
     return books = [];
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

document.querySelector('.remove-btn').addEventListener('click', (e) => {
  document.getElementById('remove-btn')
 Store.removeBook();
});

//init app
function init() {
   list.innerHTML = '';
   Store.getBooks().forEach((book) => UI.getAllBooks(book));
}
init();




