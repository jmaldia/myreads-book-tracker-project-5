import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import ListBooks from '../components/ListBooks'

class Display extends Component {
    state = {
        books: []
    }
    
    // This loads the books in the bookshelf
    componentDidMount() {
        BooksAPI.getAll()
            .then( books => { this.setState({ books }) } )
    }

    // When the category is updated, this is the method that's called to manage the changes
    handleChange = (book, value) => {
        BooksAPI.update(book, value)
            .then(
                // (books) => {
                // books.currentlyReading.forEach(bookId => {
                //     this.state.books.forEach(book => {
                //         if(book.id === bookId && book.shelf !== 'currentlyReading') {
                //             book.shelf = 'currentlyReading'
                //         }
                //         console.log(book)
                //     })
                // })
                // books.wantToRead.forEach(bookId => {
                //     this.state.books.forEach(book => {
                //         if(book.id === bookId && book.shelf !== 'wantToRead') {
                //             book.shelf = 'wantToRead'
                //         }
                //         console.log(book)
                //     })
                // })
                // books.read.forEach(bookId => {
                //     this.state.books.forEach(book => {
                //         if(book.id === bookId && book.shelf !== 'read') {
                //             book.shelf = 'read'
                //         }
                //         console.log(book)
                //     })
                // })
                // console.log(this.state.books);
                // return this.setState({ books })
            // }
            )
            BooksAPI.getAll()
            .then( books => { this.setState({ books }) } )
    }

    render() {
        // This renders the bookshelf per category
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <ListBooks 
                        handleChange={this.handleChange} 
                        books={this.state.books.filter(book => book.shelf === 'currentlyReading')} 
                        category="Currently Reading"
                    />
                    <ListBooks
                        handleChange={this.handleChange} 
                        books={this.state.books.filter(book => book.shelf === 'wantToRead')} 
                        category="Want to Read"
                    />
                    <ListBooks 
                        handleChange={this.handleChange}
                        books={this.state.books.filter(book => book.shelf === 'read')} 
                        category="Read"
                    />
                </div>

                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Display