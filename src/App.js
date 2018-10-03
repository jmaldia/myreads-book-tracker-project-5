import React from 'react'
import { Route, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Display from './views/Display'
import Search from './views/Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
      books: [], 
      searchResults: [],
      keyword: ''
  }

  componentDidMount() {
    this.grabBooks()
  }

  handleChange = (book, value) => {
      BooksAPI.update(book, value)
      
      BooksAPI.getAll()
          .then( books => this.setState({ books }) )
          .catch( err => {
            return this.setState({ books: [] }) 
          })
  }

  handleKeyword = (keyword) => {
    this.setState({ keyword })
    this.search(this.state.keyword)
  }

  grabBooks() {
    BooksAPI.getAll()
        .then( books => { this.setState({ books} )})
  }

  search = (keyword) => {
    if(!keyword ) {
        return this.setState({ books: [] })
    } else {
      BooksAPI.search(this.state.keyword)
          .then(response => {
            if(response.error) {
              return this.setState({ searchResults: [] })
            }
            return this.setState({ searchResults: response })
          })
          .catch(err => {
            return this.setState({ searchResults: [] })
          })
    }   
}

  render() {
    return (
      <div className="app">
        <Switch>
          <Route 
            exact 
            path={'/'} 
            render={() => (
              <Display
                books={this.state.books}
                handleChange={this.handleChange}
              />
            )}
          />
          <Route 
            exact 
            path={'/search'} 
            render={() => (
              <Search
                books={this.state.searchResults}
                handleChange={this.handleChange}
                handleKeyword={this.handleKeyword}
                grabBooks={this.grabBooks}
                search={this.search}
              />
            )}
          />
        </Switch> 
      </div>
    )
  }
}

export default BooksApp