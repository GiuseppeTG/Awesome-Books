const list = document.querySelector('#list');

export default class UI {
  static getAllBooks = (book) => {
    const items = document.createElement('tr');
    items.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td><button data-id="${book.id}" class="remove-btn">Remove</button></td> 
    `;

    list.appendChild(items);
  }

  static displayBooks = (book) => this.getAllBooks(book);

  static deleteBook = (element) => {
    if (element.classList.contains('remove-btn')) {
      element.parentElement.parentElement.remove();
    }
  }
}