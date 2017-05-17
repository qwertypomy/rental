import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { catchError } from  '../utils/catch';
import { CATEGORY_SET_SELECTED_CATEGORY, CATEGORY_FETCH_DATA_REQUEST, CATEGORY_RECEIVE_DATA } from '../constants';
import { authLoginUserFailure } from './auth';

export function categoryReceiveData(data) {
    return {
        type: CATEGORY_RECEIVE_DATA,
        payload: {
            data
        }
    };
}

export function categoryFetchDataRequest() {
    return {
        type: CATEGORY_FETCH_DATA_REQUEST
    };
}

export function categorySetSelectedCategory(selectedCategory) {
  return (dispatch, state) => {
    dispatch({ type: CATEGORY_SET_SELECTED_CATEGORY, payload: { selectedCategory } });
  }
}

export function categoryFetchData() {
    return (dispatch, state) => {
        dispatch(categoryFetchDataRequest());
        return fetch(`${SERVER_URL}/api/v1/categories/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(categoryReceiveData(response));
            })
            .catch(catchError(dispatch));
    };
}

export function categoryPushData(token, data) {
    return (dispatch, state) => {
        dispatch(categoryFetchDataRequest());
        return fetch(`${SERVER_URL}/api/v1/categories/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            },
            body:JSON.stringify(data)
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(categoryReceiveData(response.data));
            })
            .catch(catchError(dispatch));
    };
}
