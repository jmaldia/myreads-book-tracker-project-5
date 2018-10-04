import * as BooksAPI from '../BooksAPI'

function handleChange(book, value) {
    BooksAPI.update(book, value)
    
    BooksAPI.getAll()
        .then( books => this.setState({ books }) )
        .catch( err => {
          return this.setState({ books: [] }) 
        })
}