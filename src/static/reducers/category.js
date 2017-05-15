import { createReducer } from '../utils';
import { CATEGORY_RECEIVE_DATA, CATEGORY_FETCH_DATA_REQUEST } from '../constants';

const initialState = {
    data: null,
    isFetching: false
};

export default createReducer(initialState, {
    [CATEGORY_RECEIVE_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            data: payload.data,
            isFetching: false
        });
    },
    [CATEGORY_FETCH_DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    }
});
