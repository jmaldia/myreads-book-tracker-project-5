import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from '../components/Book'

class Search extends Component {
    state = {
        books: [],
        searchResults: [],
        keyword: ''
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then( books => { this.setState({ books }) } )
    }

    // This manages the changes in category for the searched items
    handleChange = (book, value) => {
        BooksAPI.update(book, value)
            .then(this.search(this.state.keyword))
    }
    
    // This updates this.state.keyword when the search field is updated
    // It calls on the search method to perform the search
    handleKeyword = (keyword) => {
        this.setState({ keyword }, this.search(keyword))
    }

    setShelf() {
        this.state.searchResults.forEach(searchedBook => {
            this.state.books.filter(book => {
                if (book.id === searchedBook.id) {
                    searchedBook.shelf = book.shelf
                } else {
                    searchedBook.shelf = 'none'
                }
                return book
            })
        })
    }

    // Upon getting a keyword, this method calls on the search method from the API
    // It returns a collection of books based on the search
    search = (keyword) => {
        if(!keyword || keyword === undefined || keyword === '' || keyword === null || keyword.length < 1) {
            return this.setState({ searchResults: [] })
        } else {
            BooksAPI.search(keyword)
                .then(results => {
                    if(results.error) {
                        return this.setState({ searchResults: [] })
                    }

                    this.setState({ searchResults: results }, this.setShelf())

                    

                    return results
                })
                .catch(err => {
                    return this.setState({ searchResults: [] })
                })
        }   
    }
    
    render () {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link
                    to="/"
                    className="close-search" 
                >
                    Closed
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleKeyword(event.target.value)}/>
                </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {
                        this.state.searchResults.map((book) => {
                            return (
                                <li key={book.id}>
                                    <Book book={book} handleChange={this.handleChange} />
                                </li>
                            )
                        })
                        // <ListBooks
                        //     handleChange={this.handleChange} 
                        //     books={this.state.searchResults} 
                        // />
                    } 
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search