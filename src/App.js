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
          <Route exact path={'/'} component={Display} />
          <Route exact path={'/search'} component={Search} />
        </Switch> 
      </div>
    )
  }
}

export default BooksApp