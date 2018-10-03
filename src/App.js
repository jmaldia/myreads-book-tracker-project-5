import React from 'react'
import { Route, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Display from './views/Display'
import Search from './views/Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
      books: []
  }

  componentDidMount() {
      BooksAPI.getAll()
          .then( books => { this.setState({ books} )})
          .catch( err => { console.log(err); })
  }

  handleChange = (book, value) => {
      BooksAPI.update(book, value)
      
      BooksAPI.getAll()
          .then( books => this.setState({ books }) )
          .catch( err => {
            return this.setState({ books: [] }) 
          })
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
          <Route exact path={'/search'} component={Search} />
        </Switch> 
      </div>
    )
  }
}

export default BooksApp