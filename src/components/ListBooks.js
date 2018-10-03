import React, {Component} from 'react'
import * as BooksAPI from '../BooksAPI'

class ListBooks extends Component {
    state = {
        books: []
    }
    
    componentDidMount() {
        this.setState({ books: this.updateState() })
    }

    // componentDidUpdate() {
    //     this.setState({ books: this.updateState() })
    // }

    updateState = () => {
        let books = this.props.books 

        if (this.props.category === 'Currently Reading') {
            books = books.filter(book => book.shelf === 'currentlyReading')
        } else if (this.props.category === 'Want to Read') {
            books = books.filter(book => book.shelf === 'wantToRead')
        } else if (this.props.category === 'Read') {
            books = books.filter(book => book.shelf === 'read')
        } 

        return books
    }

    handleChange = (book, value) => {
        BooksAPI.update(book, value)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    render() { 
        console.log(this.props.books);
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.category}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.state.books.map((book) => {
                                return (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks.thumbnail }}></div>
                                                <div className="book-shelf-changer">
                                                    <select value={book.shelf} onChange={(event) => {
                                                        this.handleChange(book, event.target.value)
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
                                                <div className="book-authors">{book.authors[0]}</div>
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