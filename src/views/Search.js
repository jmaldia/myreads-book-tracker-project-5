import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import ListBooks from '../components/ListBooks';

class Search extends Component {
    state = {
        books: []
    }

    query = (value) => {
        BooksAPI.search(value)
            .then((books) => {
                this.setState({ books })
            })
            .catch(err => console.log(err))
    }

    render () {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link
                    to="/"
                    className="close-search" 
                    onClick={() => this.setState({ showSearchPage: false })}
                >
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" onChange={(event) => this.query(event.target.value)}/>

                </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">

                        <ListBooks books={this.state.books}/>
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search