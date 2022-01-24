const display = document.querySelector('.book-display'); 
const newBookButton = document.querySelector('.new-book-button'); 
const modal = document.querySelector('.modal'); 
const modalExit = document.querySelector('.exit'); 

const submitNewBook = document.getElementById('submit-new-book'); 

let myLibrary = [];  

//constructor to make new Book objects
class Book {
    constructor(title, author, pages, didRead){
        this.title = title; 
        this.author = author; 
        this.pages = pages; 
        if (didRead) this.read = 'read'; 
        else this.read = 'not read yet'; 

        this.info = title + ' by ' + author + ', ' + pages + ' pages';
        this.changeRead = () => {
            if (this.read == 'read'){
                this.read = 'not read yet';
            } else this.read = 'read'; 
        }; 
    }
    removeBook(){
        let index = this.bookNum; 
        myLibrary.splice(index, 1); //removes book from array 
        for (let i = index; i < myLibrary.length; i++){ //shifts index of items after it down 1 to fill gap 
            myLibrary[i].index--; 
        }
       let bookDiv = document.querySelector(`[data-index="${index}"]`); 
       bookDiv.remove(); 
    }
    //adds Books to array myLibrary
    addBookToLibrary(){
        myLibrary.push(this); 
        this.bookNum = myLibrary.length - 1; 
    }
    //adds Book to display, displays book
    displayBook(){
        let bookDiv = document.createElement('div'); 
        bookDiv.classList.add('book-div'); 
        bookDiv.setAttribute('data-index', this.bookNum); //sets index to HTML element to be able to remove the element
        bookDiv.textContent = this.info; 

        let changeReadButton = document.createElement('button');  
        changeReadButton.addEventListener('click', () => {
            this.changeRead(); 
            changeReadButton.textContent = this.read; 
            changeReadButton.setAttribute('read-status', this.read); //to style in CSS
        }); 
        changeReadButton.setAttribute('read-status', this.read);
        changeReadButton.classList.add('change-read-button'); 
        changeReadButton.textContent = this.read; 
        bookDiv.appendChild(changeReadButton); 

        let removeButton = document.createElement('button');
        removeButton.classList.add('remove-book-button'); 
        removeButton.addEventListener('click', () => removeBook(this)); 
        removeButton.textContent = '✖'; 
        bookDiv.appendChild(removeButton); 

        display.appendChild(bookDiv); 
    }
}

//displays all books in myLibrary 
function displayAllBooks(){
    myLibrary.forEach(book => {
        book.displayBook(); 
    })
}
//event listeners for opening/closing modal 
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
    let readInput = document.getElementById('read-input').checked;
    let newBook = new Book(titleInput, authorInput, pagesInput, readInput); 

    newBook.displayBook(); 
    modal.style.display = 'none';
    reset(); 
})

//default books/tester books 
let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false); 
let theRedPyramid = new Book('The Red Pyramid', 'Rick Riordan', 357, true); 
theHobbit.addBookToLibrary(); 
theRedPyramid.addBookToLibrary(); 
displayAllBooks(); 



