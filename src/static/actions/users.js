import fetch from 'isomorphic-fetch';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { USERS_RECEIVE_DATA, USERS_FETCH_DATA_REQUEST } from '../constants';


export function usersReceiveData(data) {
    return {
        type: USERS_RECEIVE_DATA,
        payload: {
            data
        }
    };
}

export function usersFetchDataRequest() {
    return {
        type: USERS_FETCH_DATA_REQUEST
    };
}

export function usersFetchData(token) {
    return (dispatch, state) => {
        dispatch(usersFetchDataRequest());
        return fetch(`${SERVER_URL}/api/v1/accounts/users/`, {
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
                dispatch(usersReceiveData(response));
            });
    };
}
