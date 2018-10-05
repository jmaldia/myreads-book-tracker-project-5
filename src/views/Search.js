import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import ListBooks from '../components/ListBooks'

class Search extends Component {
    state = {
        searchResults: [],
        keyword: ''
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

                    let temp = results.map(book => {
                        BooksAPI.get(book.id).then((bookWithID) => {
                            book.shelf = bookWithID.shelf
                        })
                        return book
                    })

                    return this.setState({ searchResults: temp }, this.forceUpdate())
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
                        <ListBooks
                            handleChange={this.handleChange} 
                            books={this.state.searchResults} 
                        />
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search