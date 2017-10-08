import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Signup extends Component {

  handleFormSubmit = formProps => this.props.signupUser(formProps, this.props.history)

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
  	const { handleSubmit, fields:{email, password, passwordConfirm}} = this.props
  	return (
  	  <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset>
          <Field component={renderField} name='email' label='Email: '/>
        </fieldset>
        <fieldset>
          <Field component={renderField} type='password' name='password' label='Password:'/>
        </fieldset>
        <fieldset>
          <Field component={renderField} type='password' name='passwordConfirm' label='Confirm Password: '/>
        </fieldset>
        {this.renderAlert()}
        <button action='submit'>Sign up</button>
  	  </form>
  	)
  }
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const validate = formProps => {
  const errors = {}

  if(!formProps.email) {
    errors.email = 'Please enter an email'	
  }

  if(!formProps.password) {
    errors.password = 'Please enter a password'	
  }

  if(!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'	
  }
  
  if(formProps.password !== formProps.passwordConfirm) {
  	errors.password = 'Passwords must match'
  }

  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default withRouter(reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(connect(mapStateToProps, actions)(Signup)))
