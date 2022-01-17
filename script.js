const display = document.querySelector('.book-display'); 
const newBookButton = document.querySelector('.new-book-button'); 
const modal = document.querySelector('.modal'); 
const modalExit = document.querySelector('.exit'); 

const submitNewBook = document.getElementById('submit-new-book'); 

let myLibrary = []; 
let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet'); 
let theRedPyramid = new Book('The Red Pyramid', 'Rick Riordan', 357, 'read'); 
addBookToLibrary(theHobbit); 
addBookToLibrary(theRedPyramid); 
displayBooks();  

function Book(title, author, pages, read){
    this.title = title; 
    this.author = author; 
    this.pages = pages; 
    this.read = read; 
    this.info = title + ' by ' + author + ', ' + pages + ' pages, ' + read;
}

function addBookToLibrary(myBook){
    myLibrary.push(myBook); 
}

function displayBooks(){
    myLibrary.forEach(book => {
        let bookDiv = document.createElement('div'); 
        bookDiv.textContent = book.info; 
        console.log(bookDiv.textContent); 
        display.appendChild(bookDiv); 
    })
}

newBookButton.addEventListener('click', () => {
    modal.style.display = 'block'; 
})
modalExit.addEventListener('click', () => {
    reset(); 
    modal.style.display = 'none'; 
})
window.onclick = function(event){
    if (event.target == modal){
        modal.style.display = 'none'; 
    }
}

function reset() {
    document.getElementById('add-book-form').reset(); 
}

submitNewBook.addEventListener('click', () => {
    let newBookDiv = document.createElement('div'); 

    let titleInput = document.getElementById('title-input').value; 
    let authorInput = document.getElementById('author-input').value; 
    let pagesInput = document.getElementById('pages-input').value; 
    let readOnOff = document.getElementById('read-input').value;
    
    let readInput = ''; 
    if (readOnOff == 'on') readInput = 'read'; 
    else readInput = 'not read yet'; 
    
    let newBook = new Book(titleInput, authorInput, pagesInput, readInput); 

    newBookDiv.textContent = newBook.info; 
    addBookToLibrary(newBook); 
    display.appendChild(newBookDiv); 
    modal.style.display = 'none';
})

