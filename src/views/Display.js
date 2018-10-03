import React, { Component } from 'react'
import ListBooks from '../components/ListBooks'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

class Display extends Component {
    state = {
        books: [], 
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((response) => {
                this.setState({ 
                    books: response 
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <ListBooks books= {this.state.books} category="Currently Reading"/>
                    <ListBooks books= {this.state.books} category="Want to Read"/>
                    <ListBooks books= {this.state.books} category="Read"/>
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