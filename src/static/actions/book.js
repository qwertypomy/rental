import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { catchError } from  '../utils/catch';
import { BOOK_SET_STATUS, BOOK_FETCH_DATA_REQUEST, BOOK_RECEIVE_DATA } from '../constants';
import { authLoginUserFailure } from './auth';


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

export function bookFetchDataRequest() {
    return {
        type: BOOK_FETCH_DATA_REQUEST
    };
}

export function bookCreateUnauthorisedItemRental(data) {
  return (dispatch, state) => {
      dispatch(bookFetchDataRequest());
      return fetch(`${SERVER_URL}/api/v1/rentals-unauthorised/`, {
          method: 'post',
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
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

export function bookCreateUserItemRental(token, data) {
  console.log(token);
  console.log(JSON.stringify(data));
  return (dispatch, state) => {
      dispatch(bookFetchDataRequest());
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

export function bookFetchData() {
    return (dispatch, state) => {
        dispatch(bookFetchDataRequest());
        return fetch(`${SERVER_URL}/api/v1/rentals/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(bookReceiveData(response));
            });
    };
}
