import App from './pages/app'
import Home from './pages/home'
import Picture from './components/Picture'
import Counter from './pages/counter'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import React from 'react'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ Home } />
      <Route path="picture" component={Picture}/>
      <Route path="counter" component={Counter}/>
    </Route>
  </Router>
)
