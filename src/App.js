import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Display from './views/Display'
import Search from './views/Search'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route 
            exact 
            path={'/'} 
            component={ Display }
          />
          <Route 
            exact 
            path={'/search'} 
            component={ Search }
          />
        </Switch> 
      </div>
    )
  }
}

export default BooksApp

// <Route 
//             exact 
//             path={'/'} 
//             render={() => (
//               <Display
//                 books={this.state.books}
//                 handleChange={this.handleChange}
//               />
//             )}
//           />
//           <Route 
//             exact 
//             path={'/search'} 
//             render={() => (
//               <Search
//                 books={this.state.searchResults}
//                 handleChange={this.handleChange}
//                 handleKeyword={this.handleKeyword}
//                 grabBooks={this.grabBooks}
//                 search={this.search}
//               />
//             )}
//           />