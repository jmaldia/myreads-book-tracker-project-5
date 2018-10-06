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
            .then((respons) => {
                book.shelf = value
                this.setState((prevState) => ({
                    searchResults: prevState.searchResults.filter(filteredBook => filteredBook.id !== book.id).concat([book])
                }))
            })
    }
    
    // This updates this.state.keyword when the search field is updated
    // It calls on the search method to perform the search
    handleKeyword = (keyword) => {
        this.setState({ keyword }, this.search)
    }

    // Upon getting a keyword, this method calls on the search method from the API
    // It returns a collection of books based on the search
    search = () => {
        let keyword = this.state.keyword
        if(!keyword || keyword === undefined || keyword === '' || keyword === null || keyword.length < 1) {
            return this.setState({ searchResults: [] })
        } else {
            BooksAPI.search(keyword)
                .then(results => {
                    if(results.error) {
                        return this.setState({ searchResults: [] })
                    }

                    results.forEach( bookResult => {
                        let filteredBook = this.state.books.filter( book =>  book.id === bookResult.id)
                        if (filteredBook[0]) {
                            bookResult.shelf = filteredBook[0].shelf
                        } else {
                            bookResult.shelf = 'none'
                        }
                    })

                    return this.setState({ searchResults: results })
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
                    <Link to="/" className="close-search">Closed</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleKeyword(event.target.value)}/>
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                    {
                        this.state.searchResults.map(searchResult => {
                            return (
                                <li key={searchResult.id}>
                                    <Book 
                                        book={searchResult} 
                                        handleChange={this.handleChange} 
                                        shelf={searchResult.shelf}
                                    />
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

export default Search