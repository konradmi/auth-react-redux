import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as actions from '../../actions'

@withRouter

@reduxForm({
  form: 'signin'
})

@connect(
  state => ({ errorMessage: state.auth.error }),
  actions,
)

export default class Signin extends Component {

  handleFormSubmit = ( { email, password } ) => {
    this.props.signinUser({ email, password }, this.props.history)
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return(
        <div>
          <strong> Ooops! </strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
  	const { handleSubmit } = this.props

  	return (
  	  <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset>
          <label>Email:</label>
          <Field component='input' name='email'/>
        </fieldset>
        <fieldset>
          <label>Password:</label>
          <Field component='input' type='password' name='password'/>
        </fieldset>
        {this.renderAlert()}
        <button action='submit'>Sign in </button>
  	  </form>
  	 )
  }
}
