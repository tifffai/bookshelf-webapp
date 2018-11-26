////// METHOD 1
const ul = document.querySelector('.books')

function fetchBooks() {
     // get books
    // url, options
    const url = 'http://localhost:3000/books'

    const request = fetch(url) //=> promise obj
    
    return request.then(function(response) {
                return response.json()
            })
}

fetchBooks() //=> promise
    .then(function(books) {
        ul.innerText = '';
        books.forEach(addBook)
    })



function addBook(book){
    const liBook = createBook(book)
    ul.appendChild(liBook)
}

function createBook(book) {
    console.log(book.id)

    // create the li wrapper for the book
    const li = document.createElement('li')
    li.classList.add('book')
    li.dataset.id = book.id
    // create the h4 title for the book
    const title = document.createElement('h4')
    title.innerText = book.title

    const price = document.createElement('strong')
    price.innerText = 'Price: '

    const priceArea = document.createElement('p')
    priceArea.innerText = `$${(book.price / 100.00).toFixed(2)}`
    // create p tag for the price

    //button to delete
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('btn', 'btn-delete')
    deleteBtn.addEventListener('click', function(e) {
        deleteBookFetch(e).then(id => removeBook(id))
    })
    deleteBtn.innerText = 'Delete Book'
    
    li.appendChild(title)
    li.appendChild(priceArea)
    li.appendChild(deleteBtn)

    priceArea.prepend(price)

    return li

}

function deleteBookFetch(e) {
    // alert('Book has been deleted!')
    e.target //button
    const id = e.target.parentElement.dataset.id
    //delete book from db
    const url = `http://localhost:3000/books/${id}`

    return fetch(url, {
        method: 'DELETE'
    })
    .then(function() {
        return id
    })
}

function removeBook(id) {
    // better way is to make an array and spread the ul.childNodes with forEach
    // [...ul.chidNodes].forEach
    Array.from(ul.childNodes).forEach(Child => {
        if(child.dataset.id === id) {
            ul.removeChild(child)
        }
    })
}






//////// METHOD 2
// function fetchBooks() {
//     console.log('getting some books')

//     // get books
//     // url, options
//     const url = 'http://localhost:3000/books'
//     const request = fetch(url)  // promise object

//     request
        // .then(function(response) {
        //     return response.json()
        // })
        // .then(function(books) {
        //     console.log(books)// [{}, {}]
        //     books.forEach(function(book) { // {}
        //         const booksUL = document.querySelector('.books');
        //         const bookLi = document.createElement('li');
        //         const bookHeading = document.createElement('h4');
        //         const bookPara = document.createElement('p');
        //         const bookStrong = document.createElement('strong');
        //         const bookText = document.createTextNode(`: $${book.price/100.0}`)
        //         booksUL.appendChild(bookLi);
        //         bookHeading.innerText = `${book.title}`;
        //         bookLi.appendChild(bookHeading);
        //         bookLi.appendChild(bookPara);
        //         bookStrong.innerText = 'Price';
        //         bookPara.appendChild(bookStrong);
        //         bookPara.appendChild(bookText);
        //     });
        // })

    
// }

// fetchBooks()




///////// Make Form Work
// Get the form 
// Add a submit listener for the form
// POST book data added to API database
// Append newly created book from response
// Refresh feth books page 
const bookForm = document.querySelector('#bookForm')

bookForm.addEventListener('submit', (e) => {
    postBook(e)
    .then(addBook)
})

function postBook(e) {
    e.preventDefault()
    const form = e.target
    const title = form.title.value
    const isbn = form.isbn.value
    const description = form.description.value
    const price = parseInt(form.price.value)
    const author = form.author.value

    const book = {
        title, description, isbn, price, author
    }
    const url = 'http://localhost:3000/books'
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }

    form.reset()
    return fetch(url, options).then(res => res.json())
}




///////// Create Author List
const authorList = document.querySelector('.authors')

function createAuthor(authorData) {
    const authorLinks = document.createElement('li')
    const link = document.createElement('a')
    link.addEventListener('click', function(e) {
        e.preventDefault()
        alert(authorData.id)
    })
    link.href = '#' // normally if there were individual pages for each author to link it would be: '/authors/${id}/'OR `/authors?id={id}`
    const fullName = authorData.firstname
    // const{firstname,lastname} = authorData  // this way it more direct, method below reassigns the key name into Javascript happy camelCase
    const {
        ['firstname']:firstName,
        ['lastname']:lastName
    } = authorData
    link.innerText = `${firstName} ${lastName}`
    authorLinks.appendChild(link)
    return authorLinks

}

function fetchAuthors() {
    const url = 'http://localhost:3000/authors'
    const authors = fetch(url).then(res => res.json())
    return authors//promise
}

function addAuthor(author) {
    authorList.appendChild(createAuthor(author))
}

fetchAuthors()
.then(authors => authors.forEach(addAuthor))


