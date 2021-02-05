const slider = document.getElementById("pages");
const output = document.getElementById("range-display");
output.innerText = slider.value;

slider.oninput = function() {
  output.innerText = this.value;
}

function lsTest(){
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

if(lsTest() === true){
  const form = document.getElementById('form');

  form.addEventListener('submit', addBookToLibrary);

  let myLibrary = [];

  function Book(title,author,read,pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
      return `${title} by ${author}, ${pages}, ${read}`
    }
  }

  function addBookToLibrary(event) {
    event.preventDefault();

    if(localStorage.getItem('library') == null){
      localStorage.setItem('library', '[]');
    }

    const newBook = new Book(title.value, author.value, read.value, pages.value);

    let oldBooks = JSON.parse(localStorage.getItem('library'));

    oldBooks.push(newBook)

    localStorage.setItem('library', JSON.stringify(oldBooks));
    addToPage();
    clearForm();
  }


  function addToPage() {
    let books = JSON.parse(localStorage.getItem('library'));
    let table = document.getElementById('table');

    /* handle duplicates */
    while(table.hasChildNodes()){
      table.removeChild(table.lastChild)
    }

    books.forEach((book) => {
     const info = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.read}</td>
         <td>${book.pages}</td>
       `;
       table.insertAdjacentHTML("beforeend", info);
   });
  }

  function clearForm() {
    title.value = "";
    author.value = "";
  }

  addToPage(); /* so localStorage fills the page on refresh */
}else{
    alert('Enable cookies to store books')
}
