import React, {Component} from 'react'

class ListBooks extends Component {
    // componentDidMount() {
    //     if (this.props.query === '') {
    //         BooksAPI.getAll()
    //             .then( books => {
    //                 this.updateState(books)
    //             })
    //             .catch( err => { console.log(err); })
    //     } else {
    //         BooksAPI.search(this.props.query)
    //             .then( books => {
    //                 // this.setState({ books })
    //             })
    //             .catch( err => console.log(err) )
    //     }
    // }

    // componentDidUpdate() {
    //     if (this.props.query === '') {
    //         BooksAPI.getAll()
    //             .then( books => {
    //                 this.updateState(books)
    //             })
    //             .catch( err => { console.log(err); })
    //     } else {
    //         BooksAPI.search(this.props.query)
    //             .then( books => {
    //                 // this.setState({ books })
    //             })
    //             .catch( err => console.log(err) )
    //     }
    // }

    // updateState = (books) => {
    //     let myBooks = books

    //     if (this.props.category === 'Currently Reading') {
    //         myBooks = books.filter(book => book.shelf === 'currentlyReading')
    //     } else if (this.props.category === 'Want to Read') {
    //         myBooks = books.filter(book => book.shelf === 'wantToRead')
    //     } else if (this.props.category === 'Read') {
    //         myBooks = books.filter(book => book.shelf === 'read')
    //     } 

    //     this.setState({ books: myBooks })
    // }
    componentDidUpdate() {
        
    }

    // handleChange = (book, value) => {
    //     BooksAPI.update(book, value)
    //         .then(response => console.log('Successfully changed category'))
    //         .catch(err => console.log(err))
    // }

    render() { 
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.category}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        this.props.books.map((book) => {
                            return (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks.thumbnail }}></div>
                                            <div className="book-shelf-changer">
                                                <select value={book.shelf} onChange={(event) => {
                                                    this.props.handleChange(book, event.target.value)
                                                }}>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors.map(author => author + '\n')}</div>
                                        </div>
                                    </li>
                                )
                            }
                        )
                    }
                </ol> 
            </div>   
            </div>            
        )
    }
}

export default ListBooks;