import axios from 'axios'
import { browserHistory } from 'react-router'
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types'

const ROOT_URL = 'http://localhost:3090'

export const signinUser = ({ email, password }) => (dispatch) => {
  axios.post(`${ROOT_URL}/signin`, { email, password })
    .then(response => {
      dispatch({ type: AUTH_USER })
      localStorage.setItem('token', response.data.token)
      browserHistory.push('/feature')
    })
    .catch(e => {
      dispatch(authError('Bad login info'))
    })
}

export const authError = error => {
  return {
  	type: AUTH_ERROR,
  	payload: error
  }
}

export const signoutUser = () => {
  localStorage.removeItem('token')
  return {
    type: UNAUTH_USER
  }
}

export const signupUser = ({ email, password }) => (dispatch) =>
  axios.post(`${ROOT_URL}/signup`, {email, password})
    .then(response => {
      dispatch({ type: AUTH_USER})
      localStorage.setItem('token', response.data.token)
      browserHistory.push('/feature')
    })
    .catch(e => {
      dispatch(authError('Email in use'))
    })

export const fetchMessage = () => (dispatch) => 
  axios.get(ROOT_URL, {
    headers: { authorization: localStorage.getItem('token') }
  })
  .then(response => dispatch({type: FETCH_MESSAGE, payload: response.data.message}))
  .catch(error => console.log(error.response))


// export const fetchMessage = () => {
//   const request = axios.get(ROOT_URL, {
//     headers: { authorization: localStorage.getItem('token') }
//   })
  
//   return {
//     type: FETCH_MESSAGE,
//     payload: request
//   }
// }

