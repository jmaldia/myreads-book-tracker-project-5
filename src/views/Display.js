import React, { Component } from 'react'
import ListBooks from '../components/ListBooks'
import { Link } from 'react-router-dom'

class Display extends Component {

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <ListBooks category="Currently Reading"/>
                        <ListBooks category="Want to Read"/>
                        <ListBooks category="Read"/>
                    </div>
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