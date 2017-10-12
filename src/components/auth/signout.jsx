import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../actions'

@connect(null, actions)

export default class Signout extends Component {
  static propTypes = {
    signoutUser: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.signoutUser()
  }

  render() {
    return <div> Sorry to see you go... </div>
  }
}
