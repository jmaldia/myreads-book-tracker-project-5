import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import ListBooks from '../components/ListBooks'

class Search extends Component {
    state = {
        books: [],
        searchResults: [],
        keyword: ''
    }
  
    componentDidMount() {
        this.search(this.state.keyword)
        BooksAPI.getAll()
            .then( books => { this.setState({ books }) } )
        console.log(this.state.books);
    }
  
    handleChange = (book, value) => {
        BooksAPI.update(book, value).then(this.search(this.state.keyword))
    }
  
    handleKeyword = (keyword) => {
        this.setState({ keyword })
        this.search(keyword)
        console.log(this.state.searchResults);
    }

    search = (keyword) => {
        let tempBooks = []

        if(!keyword || keyword === undefined || keyword === '' || keyword === null || keyword.length < 1) {
            return this.setState({ searchResults: [] })
        } else {
            BooksAPI.search(this.state.keyword)
                .then(searchedBooks => {
                    if(searchedBooks.error) {
                        return this.setState({ searchResults: [] })
                    }

                    searchedBooks.map(searchedBook => {
                        return this.state.books.forEach(book => {
                            if (searchedBook.id === book.id) {
                                tempBooks.push(book)
                            }
                        })
                    })

                    return this.setState({ searchResults: tempBooks })
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
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" onInput={(event) => this.handleKeyword(event.target.value)}/>
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