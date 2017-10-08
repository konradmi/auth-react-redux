import axios from 'axios'
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types'

const ROOT_URL = 'http://localhost:3090'

export const authError = error => ({
  type: AUTH_ERROR,
  payload: error,
})


export const signinUser = ({ email, password }, history) => (dispatch) => {
  axios.post(`${ROOT_URL}/signin`, { email, password })
    .then(response => {
      dispatch({ type: AUTH_USER })
      localStorage.setItem('token', response.data.token)
      history.push('/feature')
    })
    .catch(e => {
      dispatch(authError('Bad login info'))
    })
}

export const signoutUser = () => {
  localStorage.removeItem('token')
  return {
    type: UNAUTH_USER,
  }
}

export const signupUser = ({ email, password }, history) => (dispatch) =>
  axios.post(`${ROOT_URL}/signup`, {email, password})
    .then(response => {
      console.log(response.data)
      dispatch({ type: AUTH_USER})
      localStorage.setItem('token', response.data.token)
      history.push('/feature')
    })
    .catch(e => {
      console.log('error', e)
      dispatch(authError('Email in use'))
    })

export const fetchMessage = () => (dispatch) =>
  axios.get(ROOT_URL, {
    headers: { authorization: localStorage.getItem('token') }
  })
  .then(response => dispatch({type: FETCH_MESSAGE, payload: response.data.message }))
  .catch(error => console.log(error.response))
