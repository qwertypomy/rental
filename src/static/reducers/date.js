import { createReducer } from '../utils';
import { DATE_SET_DATE_RANGE } from '../constants';

const initialState = {
    dateRange: {}
};

export default createReducer(initialState, {
    [DATE_SET_DATE_RANGE]: (state, payload) => {
        return Object.assign({}, state, {
            dateRange: payload.dateRange
        });
    },
});
