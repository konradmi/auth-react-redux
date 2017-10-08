import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './header'
import Signin from './auth/signin'
import Signout from './auth/signout'
import Signup from './auth/signup'
import RequireAuth from './auth/require_auth'
import Feature from './feature'
import Welcome from './welcome'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signout' component={Signout} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/feature' component={RequireAuth(Feature)} />
        </Switch>
      </div>
    )
  }
}
