import React, {Component} from 'react'
import * as BooksAPI from '../BooksAPI';
// import PropTypes from 'prop-types'

class ListBooks extends Component {
    // static propTypes = {
    //     books: PropTypes.array.isRequired, 
    //     category: PropTypes.string.isRequired
    // }
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            if (this.props.category === 'Currently Reading') {
                this.setState({ 
                    books: books.filter(book => book.shelf === 'currentlyReading')
                })
                console.log(this.state.books[0].imageLinks.thumbnail)
            } else if (this.props.category === 'Want to Read') {
                this.setState({ 
                    books: books.filter(book => book.shelf === 'wantToRead')
                })
            } else if (this.props.category === 'Read') {
                this.setState({
                    books: books.filter(book => book.shelf === 'read')
                })
            } 
            // else {
            //     this.setState({
            //         books: books.filter(book => book.shelf === 'none')
            //     })
            // }
        }).catch((err) => {
            console.log(err);
        })
    }

    render() { 
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
                                                    <select value={book.shelf}>
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
                                })
                        }
                    </ol> 
                </div>    
            </div>         
        )
    }
}

export default ListBooks;