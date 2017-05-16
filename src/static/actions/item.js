import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { catchError } from  '../utils/catch';
import { ITEM_FETCH_DATA_REQUEST, ITEM_RECEIVE_DATA } from '../constants';

export function itemReceiveData(data) {
    return {
        type: ITEM_RECEIVE_DATA,
        payload: {
            data
        }
    };
}

export function itemFetchDataRequest() {
    return {
        type: ITEM_FETCH_DATA_REQUEST
    };
}

export function itemFetchData() {
    return (dispatch, state) => {
        dispatch(itemFetchDataRequest());
        return fetch(`${SERVER_URL}/api/v1/items/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(itemReceiveData(response));
            })
            .catch(catchError(dispatch));
    };
}

export function itemFetchDataByCategory(url) {
    return (dispatch, state) => {
        dispatch(itemFetchDataRequest());
        return fetch(`${url}items/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(itemReceiveData(response));
            })
            .catch(catchError(dispatch));
    };
}

export function itemPushData(token, data) {
    return (dispatch, state) => {
        dispatch(itemFetchDataRequest());
        return fetch(`${SERVER_URL}/api/v1/items/`, {
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
                dispatch(itemReceiveData(response.data));
            })
            .catch(catchError(dispatch));
    };
}
