import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Display from './views/Display'
import Search from './views/Search'
import './App.css'

class BooksApp extends React.Component {
  render() {
    // Below uses react-router-dom to display the Main page and Search pages
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