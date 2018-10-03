import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import ListBooks from '../components/ListBooks'

class Display extends Component {
    state = {
        books: []
    }
  
    componentDidMount() {
      this.grabBooks()
    }
  
    grabBooks() {
      BooksAPI.getAll()
          .then( books => { this.setState({ books} )})
    }

    handleChange = (book, value) => {
        BooksAPI.update(book, value)
        
        BooksAPI.getAll()
            .then( books => this.setState({ books }) )
            .catch( err => {
              return this.setState({ books: [] }) 
            })
    }

    render() {
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
                    <Link
                        to="/search"
                        onClick={() => this.setState({ showSearchPage: true })}
                    >
                        Add a book
                    </Link>
                </div>
            </div>
        )
    }
}

export default Display