import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import validate from '../../validators/signup-validators'
import * as actions from '../../actions'

@withRouter

@reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})

@connect(
  state => ({ errorMessage: state.auth.error }),
  actions,
)

export default class Signup extends Component {

  static propTypes = {
    signupUser: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
  }

  defaultProps = {
    errorMessage: '',
  }

  handleFormSubmit = formProps => this.props.signupUser(formProps, this.props.history)

  renderAlert() {
    const { errorMessage } = this.props

    return errorMessage && (
      <div>
        <strong> Ooops! </strong> {errorMessage}
      </div>
    )
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
