import { createReducer } from '../utils';
import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGOUT_USER,
    AUTH_EDIT_USER_SUCCESS
} from '../constants';

const initialState = {
    data: null,
    isAuthenticated: false,
    isAuthenticating: false
};

export default createReducer(initialState, {
    [AUTH_LOGIN_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: true,
            statusText: null
        });
    },
    [AUTH_LOGIN_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            data: {
              token: payload.token,
              url: payload.url,
              userName: payload.user.first_name ? payload.user.first_name : 'User',
              phoneNumber: payload.user.phone_number,
              firstName: payload.user.first_name,
              lastName: payload.user.last_name,
              email: payload.user.email,
            },
            statusText: 'You have been successfully logged in.'
        });
    },
    [AUTH_EDIT_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            data: {
              ...state.data,
              userName: payload.user.first_name ? payload.user.first_name : 'User',
              phoneNumber: payload.user.phone_number,
              firstName: payload.user.first_name,
              lastName: payload.user.last_name,
              email: payload.user.email,
            },
            statusText: 'Your account information have been successfully changed.'
        });
    },

    [AUTH_LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            data: null,
            statusText: `Authentication Error: ${payload.status} - ${payload.statusText}`
        });
    },
    [AUTH_LOGOUT_USER]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticated: false,
            data:null,
            statusText: 'You have been successfully logged out.'
        });
      },
});
