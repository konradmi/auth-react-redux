import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../actions'

@connect(
  state => ({message: state.auth.message}),
  actions
)

export default class Feature extends Component {

  static propTypes = {
    fetchMessage: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
  }
	
  componentWillMount() {
    this.props.fetchMessage()
  }

  render() {
    return (
      <div>{this.props.message}</div> 
    )
  }
}
