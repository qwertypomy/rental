import { createReducer } from '../utils';
import { BOOK_SET_STATUS, BOOK_FETCH_DATA_REQUEST, BOOK_RECEIVE_DATA } from '../constants';

const initialState = {
    isFetching: false,
    statusText: '',
    data: null
};

export default createReducer(initialState, {
    [BOOK_SET_STATUS]: (state, payload) => {
        return Object.assign({}, state, {
            statusText: payload.statusText
        });
    },
    [BOOK_RECEIVE_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            statusText: payload.statusText,
            isFetching: false,
            data: payload.data
        });
    },
    [BOOK_FETCH_DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    }
});
