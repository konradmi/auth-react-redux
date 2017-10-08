import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

@withRouter

@connect(
  state => ({ authenticated: state.auth.authenticated }),
)

export default function(ComposedComponent) {
  return class Authentication extends Component {

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
}
