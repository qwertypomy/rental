import { createReducer } from '../utils';
import { USERS_RECEIVE_DATA, USERS_FETCH_DATA_REQUEST } from '../constants';

const initialState = {
    data: null,
    isFetching: false
};

export default createReducer(initialState, {
    [USERS_RECEIVE_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            data: payload.data,
            isFetching: false
        });
    },
    [USERS_FETCH_DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    }
});
