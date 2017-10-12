import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

@withRouter

@connect(
  state => ({ authenticated: state.auth.authenticated }),
)

export default function(ComposedComponent) {
  return class Authentication extends Component {
    
    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      history: PropTypes.object.isRequired,
    }

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
