const display = document.querySelector('.book-display'); 
const newBookButton = document.querySelector('.new-book-button'); 
const modal = document.querySelector('.modal'); 
const modalExit = document.querySelector('.exit'); 

const submitNewBook = document.getElementById('submit-new-book'); 

let myLibrary = []; 

//default books/tester books 
let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet'); 
let theRedPyramid = new Book('The Red Pyramid', 'Rick Riordan', 357, 'read'); 
addBookToLibrary(theHobbit); 
addBookToLibrary(theRedPyramid); 
displayAllBooks();  

//constructor to make new Book objects
function Book(title, author, pages, read){
    this.title = title; 
    this.author = author; 
    this.pages = pages; 
    this.read = read; 
    this.info = title + ' by ' + author + ', ' + pages + ' pages, ' + read;
}

//adds Books to array myLibrary
function addBookToLibrary(myBook){
    myLibrary.push(myBook); 
    myBook.bookNum = myLibrary.length - 1; 
}

//adds Book to display, displays book
function displayBook(myBook){
    let bookDiv = document.createElement('div'); 
    bookDiv.classList.add('book-div'); 
    bookDiv.setAttribute('data-index', myBook.bookNum); //sets index to HTML element to be able to remove the element
    bookDiv.textContent = myBook.info; 

    let removeButton = document.createElement('button');
    removeButton.classList.add('remove-book-button'); 
    removeButton.addEventListener('click', () => removeBook(myBook)); 
    removeButton.textContent = '✖'; 
    bookDiv.appendChild(removeButton); 

    display.appendChild(bookDiv); 
}

//displays all books in myLibrary 
function displayAllBooks(){
    myLibrary.forEach(book => {
        displayBook(book); 
    })
}

newBookButton.addEventListener('click', () => {
    modal.style.display = 'block'; 
})
modalExit.addEventListener('click', () => {
    reset(); 
    modal.style.display = 'none'; 
})
window.onclick = function(event){ //if clicks outside of modal, closes modal
    if (event.target == modal){
        reset(); 
        modal.style.display = 'none'; 
    }
}

function reset() {
    document.getElementById('add-book-form').reset(); 
}

//reads input from form and creates new book and adds to display 
submitNewBook.addEventListener('click', () => {
    let titleInput = document.getElementById('title-input').value; 
    let authorInput = document.getElementById('author-input').value; 
    let pagesInput = document.getElementById('pages-input').value; 
    let readOnOff = document.getElementById('read-input').value;
    
    let readInput = ''; 
    if (readOnOff == 'on') readInput = 'read'; 
    else readInput = 'not read yet'; 
    
    let newBook = new Book(titleInput, authorInput, pagesInput, readInput); 

    displayBook(newBook); 
    modal.style.display = 'none';
})


function removeBook(myBook){
    let index = myBook.bookNum; 
    myLibrary.splice(index, 1); //removes book from array 
    for (let i = index; i < myLibrary.length; i++){ //shifts index of items after it down 1 to fill gap 
        myLibrary[i].index--; 
    }
   let bookDiv = document.querySelector(`[data-index="${index}"]`); 
   bookDiv.remove(); 
}

