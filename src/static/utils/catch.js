import { authLoginUserFailure } from '../actions/auth';

export function catchError(dispatch) {
  return (error) => {
    if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
        // Invalid authentication credentials
        return error.response.json().then((data) => {
            dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
        });
    } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
        // Server side error
        dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
    } else {
        // Most likely connection issues
        dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
    }

    return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
  }
}
