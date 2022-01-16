const display = document.querySelector('.book-display'); 
const newBookButton = document.querySelector('.new-book-button'); 
const modal = document.querySelector('.modal'); 
const modalExit = document.querySelector('.exit'); 

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
    this.info = () => title + ' by ' + author + ', ' + pages + ' pages, ' + read;
}

function addBookToLibrary(myBook){
    myLibrary.push(myBook); 
}

function displayBooks(){
    myLibrary.forEach(book => {
        let bookDiv = document.createElement('div'); 
        bookDiv.textContent = book.info(); 
        display.appendChild(bookDiv); 
    })
}

newBookButton.addEventListener('click', () => {
    modal.style.display = 'block'; 
})
modalExit.addEventListener('click', () => {
    modal.style.display = 'none'; 
})
window.onclick = function(event){
    if (event.target == modal){
        modal.style.display = 'none'; 
    }
}

