import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import ListBooks from '../components/ListBooks'
import * as BooksAPI from '../BooksAPI'

class Search extends Component {
    state = {
        books: [],
        keyword: ''
    }
    
    componentDidMount() {
        BooksAPI.getAll()
            .then( books => this.setState({ books }) )
            .catch(err => console.log(err))
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
        console.log(this.state.keyword);
        if(this.state.keyword) {
            console.log('componentDidUpdate - search')
            BooksAPI.search(this.state.keyword)
            .then( books => console.log(books) )
            .catch(err => console.log(err))
        }
    }

    handleChange = (book, value) => {
        console.log('handleChange')
        BooksAPI.update(book, value)
            .then(response => console.log('Successfully changed category'))
            .catch(err => console.log(err))
    }

    // search = (keyword) => {
    //     if(keyword) {
    //         BooksAPI.search(this.state.keyword.trim())
    //             .then(response => this.setState({ results: response }))
    //             .catch(err => this.setState({ results: [] }))
    //     } else {
    //         this.setState({ results: [] })
    //     }   
        
    //     console.log(this.state.results) 
    // }

    handleKeyword = (keyword) => {
        this.setState({ keyword })
    }

    render () {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link
                    to="/"
                    className="close-search" 
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
                    <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleKeyword(event.target.value)}/>
                </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    <ListBooks
                        handleChange={this.handleChange} 
                        books={this.state.books} 
                        category=""
                    />
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search