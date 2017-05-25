import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { catchError } from  '../utils/catch';
import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGOUT_USER,
    AUTH_EDIT_USER_SUCCESS
} from '../constants';
import { accountInfoToggleButton } from './accountInfo';

export function authLoginUserSuccess(token, user) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    return {
        type: AUTH_LOGIN_USER_SUCCESS,
        payload: {
            token,
            user
        }
    };
}

export function authEditUserSuccess(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    return {
        type: AUTH_EDIT_USER_SUCCESS,
        payload: {
            user
        }
    };
}

export function authLoginUserFailure(error, message) {
    sessionStorage.removeItem('token');
    return {
        type: AUTH_LOGIN_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function authLoginUserRequest() {
    return {
        type: AUTH_LOGIN_USER_REQUEST
    };
}

export function authLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return {
        type: AUTH_LOGOUT_USER
    };
}

export function authLogoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(authLogout());
        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    };
}

export function authLoginUser(phoneNumber, password, redirect = '/') {
    return (dispatch) => {
        dispatch(authLoginUserRequest());
        const auth = btoa(`${phoneNumber}:${password}`);
        return fetch(`${SERVER_URL}/api/v1/accounts/login/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(authLoginUserSuccess(response.token, response.user));
                dispatch(push(redirect));
            })
            .catch(catchError(dispatch));
    };
}

export function authRegisterUser(phoneNumber, firstName, lastName, email, password, redirect = '/') {
  const sEmail = email?email:'';
  return (dispatch) => {
    dispatch(authLoginUserRequest());
    return fetch(`${SERVER_URL}/api/v1/accounts/register/`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number:phoneNumber, first_name:firstName, last_name:lastName, email:sEmail, password })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
          dispatch(authLoginUserSuccess(response.token, response.user));
          dispatch(push(redirect));
      })
      .catch(catchError(dispatch));
  }
}

export function authEditUser(url, token, firstName, lastName, email) {
  const sEmail = email?email:'';
  return (dispatch) => {
    dispatch(authLoginUserRequest());
    return fetch(url, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ first_name:firstName, last_name:lastName, email:sEmail })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
          dispatch(authEditUserSuccess(response));
          dispatch(accountInfoToggleButton());
      })
  }
}
