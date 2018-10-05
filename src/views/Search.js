import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import ListBooks from '../components/ListBooks'

// let tempBooks = []

class Search extends Component {
    state = {
        // allBooks: [],
        searchResults: [],
        keyword: ''
    }
  
    componentDidMount() {
    }
  
    handleChange = (book, value) => {
        BooksAPI.update(book, value)
            .then(this.search(this.state.keyword))
        
    }
  
    handleKeyword = (keyword) => {
        this.setState({ keyword }, this.search(keyword))
        // tempBooks = []
    }

    search = (keyword) => {
        console.log(keyword)

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

                    return this.setState({
                        searchResults: temp
                    })

                    // return this.setState({ searchResults })
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