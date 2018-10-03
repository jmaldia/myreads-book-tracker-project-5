import React, {Component} from 'react';
import ListBooks from '../components/ListBooks';

class Display extends Component {
    state = {
        showSearchPage: true
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <ListBooks books={this.state.books} category="Currently Reading"/>
                        <ListBooks books={this.state.books} category="Want to Read"/>
                        <ListBooks books={this.state.books} category="Read"/>
                    </div>
                </div>

                <div className="open-search">
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
        )
    }
}

export default Display