import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

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

  static propTypes = {
    signinUser: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
  }

  defaultProps = {
    errorMessage: '',
  }

  handleFormSubmit = ( { email, password } ) => {
    const { signinUser, history } = this.props
    
    signinUser({ email, password }, history)
  }

  renderAlert = () => this.props.errorMessage && (
    <div>
      <strong> Ooops! </strong> {errorMessage}
    </div>
  )

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
