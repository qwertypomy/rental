import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { catchError } from  '../utils/catch';
import { DATA_FETCH_DATA_REQUEST, DATA_RECEIVE_DATA } from '../constants';
import { authLoginUserFailure } from './auth';


export function dataReceiveData(data) {
    return {
        type: DATA_RECEIVE_DATA,
        payload: {
            data
        }
    };
}

export function dataFetchDataRequest() {
    return {
        type: DATA_FETCH_DATA_REQUEST
    };
}

export function dataFetchData(token, path) {
    return (dispatch, state) => {
        dispatch(dataFetchDataRequest());
        return fetch(`${SERVER_URL}/api/v1/${path}/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(dataReceiveData(response.data));
            })
            .catch(catchError(dispatch));
    };
}

export function dataPushData(token, path, data) {
    return (dispatch, state) => {
        dispatch(dataFetchDataRequest());
        return fetch(`${SERVER_URL}/api/v1/${path}/`, {
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
                dispatch(dataReceiveData(response.data));
            })
            .catch(catchError(dispatch));
    };
}
