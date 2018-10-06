import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import ListBooks from '../components/ListBooks'

class Display extends Component {
    state = {
        books: [], 
        currentlyReadingBooks: [], 
        wantToReadBooks:[],
        readBooks:[]
    }
    
    // This loads the books in the bookshelf
    componentDidMount() {
        BooksAPI.getAll()
            .then( books => { this.setState({ books }) } )
            .then( books => this.filterBooks())
            .catch(err => this.setState({ books: [] }) )
    }
    
    filterBooks() {
        this.setState({
            currentlyReadingBooks: this.state.books.filter(book => {
                return book.shelf === 'currentlyReading'
            }),
            wantToReadBooks: this.state.books.filter(book => {
                return book.shelf === 'wantToRead'
            }),
            readBooks: this.state.books.filter(book => {
                return book.shelf === 'read'
            })
        })
    }

    // When the category is updated, this is the method that's called to manage the changes
    handleChange = (book, newCategory) => {
        BooksAPI.update(book, newCategory)
            .then( books => {
                books.currentlyReading.forEach(bookID => {
                    this.state.books.forEach(book => {
                        if (book.id === bookID) book.shelf = 'currentlyReading'
                    })
                })
                books.wantToRead.forEach(bookID => {
                    this.state.books.forEach(book => {
                        if (book.id === bookID) book.shelf = 'wantToRead'
                    })
                })
                books.read.forEach(bookID => {
                    this.state.books.forEach(book => {
                        if (book.id === bookID) book.shelf = 'read'
                    })
                })
                this.filterBooks()
                
            }).catch(err => this.setState({ books: [] }) )
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
                        books={this.state.currentlyReadingBooks} 
                        category="currentlyReading"
                    />
                    <ListBooks
                        handleChange={this.handleChange} 
                        books={this.state.wantToReadBooks} 
                        category="wantToRead"
                    />
                    <ListBooks 
                        handleChange={this.handleChange}
                        books={this.state.readBooks} 
                        category="read"
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