import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import * as actions from '../../actions'

class Signin extends Component {

  handleFormSubmit = ( { email, password } ) => {
    this.props.signinUser({ email, password })
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return(
        <div className='alert alert-danger'>
          <strong> Ooops! </strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
  	const { handleSubmit } = this.props

  	return (
  	  <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className='form-group'>
          <label>Email:</label>
          <Field component='input' name='email' className='form-control'/>
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <Field component='input' type='password' name='password' className='form-control'/>
        </fieldset>
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign in </button>
  	  </form>
  	 )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signin'
})((connect(mapStateToProps, actions))(Signin))