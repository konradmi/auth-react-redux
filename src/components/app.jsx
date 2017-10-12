import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './Header'
import Signin from './auth/Signin'
import Signout from './auth/Signout'
import Signup from './auth/Signup'
import RequireAuth from './auth/RequireAuth'
import Feature from './Feature'
import Welcome from './Welcome'

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
