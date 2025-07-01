const myLibrary = [];

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 2, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 3, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 4, true);

const library = document.querySelector(".library");

const newButton = document.querySelector(".newBook");
const submitButton = document.querySelector("form button");
const form = document.querySelector("form");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  form.style.display = "none";
  let data = new FormData(document.querySelector("form"));
  addBookToLibrary(
    data.get("title"),
    data.get("author"),
    data.get("pages"),
    data.get("read")
  );
  removeBooks();
  displayBooks();
});

newButton.addEventListener("click", (event) => (form.style.display = "block"));
displayBooks();

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("Use function with new");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.flip = function () {
    this.read = !this.read;
  };
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages ${
      this.read ? "read already" : "not read yet"
    }`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  myLibrary.forEach((element) => {
    const newBook = document.createElement("div");
    const bookText = document.createElement("p");
    bookText.textContent = element.info();
    newBook.setAttribute("class", "book");
    const deleteBook = document.createElement("button");
    deleteBook.textContent = "delete";
    deleteBook.style.margin = "1rem";
    const readBook = document.createElement("button");
    readBook.textContent = "read";
    readBook.style.margin = "1rem";
    deleteBook.addEventListener("click", (element) => {
      element.target.parentNode.parentNode.removeChild(
        element.target.parentNode
      );
    });

    readBook.addEventListener("click", (element) => {
      myLibrary.forEach((item) => {
        if (
          item.info() ===
          element.target.parentNode.querySelector("p").textContent
        ) {
          item.flip();

          removeBooks();
          displayBooks();
        }
      });
    });
    library.appendChild(newBook);
    newBook.appendChild(bookText);
    newBook.appendChild(deleteBook);
    newBook.appendChild(readBook);
  });
}

function removeBooks() {
  library.replaceChildren();
}
