import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/header'
import '../assets/styles/app.styl'

if (!__SERVER__) {
  require('../util/flexible')
}

class App extends Component {
  render () {
    return (
      <div>
        <Header />

        <div className="in-app" />

        {this.props.children}
      </div>
    )
  }
}

export default connect(state => ({

}))(App)