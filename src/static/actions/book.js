import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { catchError } from  '../utils/catch';
import { BOOK_SET_STATUS, BOOK_FETCH_DATA_REQUEST, BOOK_RECEIVE_DATA, BOOK_SET_BOOK } from '../constants';
import { authLoginUserFailure } from './auth';
import { queryString } from  '../utils/request';

function bookSetStatus(statusText) {
  return { type: BOOK_SET_STATUS, payload: { statusText } }
}

export function bookChangeStatus(statusText) {
  return (dispatch, state) => {
    dispatch(bookSetStatus(statusText));
  }
}

export function bookReceiveData(data, statusText='') {
    return {
        type: BOOK_RECEIVE_DATA,
        payload: {
            data,
            statusText
        }
    };
}

export function bookSetBook(data) {
    return {
        type: BOOK_SET_BOOK,
        payload: {
            data
        }
    };
}

export function bookFetchUserRentalsRequest() {
    return {
        type: BOOK_FETCH_DATA_REQUEST
    };
}

export function bookCreateUnauthorisedItemRental(data) {
  return (dispatch, state) => {
      dispatch(bookFetchUserRentalsRequest());
      return fetch(`${SERVER_URL}/api/v1/rentals-unauthorised/`, {
          method: 'post',
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRFToken', Cookies.get('csrftoken'))
          }
      })
          .then(checkHttpStatus)
          .then(parseJSON)
          .then((response) => {
              dispatch(bookReceiveData(response, "The reservation is successfully completed!"));
          });
  };
}

export function bookCreateUserItemRental(token, data) {
  return (dispatch, state) => {
      dispatch(bookFetchUserRentalsRequest());
      return fetch(`${SERVER_URL}/api/v1/rentals/`, {
          method: 'post',
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
          },
          body: JSON.stringify(data)
      })
          .then(checkHttpStatus)
          .then(parseJSON)
          .then((response) => {
              dispatch(bookReceiveData(response, "The reservation is successfully completed!"));
          });
  };
}

export function bookFetchUserRentals(token) {
    return (dispatch, state) => {
        dispatch(bookFetchUserRentalsRequest());
        return fetch(`${SERVER_URL}/api/v1/rentals/`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(bookReceiveData(response));
            });
    };
}

export function bookFetchAllRentals(token, params={}) {
  console.log(`${SERVER_URL}/api/v1/all-rentals/${queryString(params)}`);
    return (dispatch, state) => {
        dispatch(bookFetchUserRentalsRequest());
        return fetch(`${SERVER_URL}/api/v1/all-rentals/${queryString(params)}`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(bookReceiveData(response));
            });
    };
}

export function bookEditRental(url, token, data) {
  console.log(JSON.stringify(data));
  return (dispatch, state) => {
      dispatch(bookFetchUserRentalsRequest());
      return fetch(url, {
          method: 'put',
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
          },
          body: JSON.stringify(data)
      })
          .then(checkHttpStatus)
          .then(parseJSON)
          .then((response) => {
              dispatch(bookSetBook(response));
          });
  };
}
