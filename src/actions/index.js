import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URI = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return (dispatch) => {

    // submit email password to server
    axios.post(`${ROOT_URI}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(() => { dispatch(authError('Bad Login Info')) });

  }; // end return dispatch

}// end signin

export function signupUser({ email, password }) {
  return (dispatch) => {

    axios.post(`${ROOT_URI}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch((error) => {
        dispatch(authError(error.response.data.error))
      });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage () {
  return (dispatch) => {
    axios.get(ROOT_URI, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log(response.data.message);
        dispatch({
          type: FETCH_MESSAGE
          , payload: response.data.message
        });
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR
    , payload: error
  }
}
