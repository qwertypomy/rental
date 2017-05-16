import { createReducer } from '../utils';
import { ITEM_RECEIVE_DATA, ITEM_FETCH_DATA_REQUEST } from '../constants';

const initialState = {
    data: null,
    isFetching: false
};

export default createReducer(initialState, {
    [ITEM_RECEIVE_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            data: payload.data,
            isFetching: false
        });
    },
    [ITEM_FETCH_DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    }
});
