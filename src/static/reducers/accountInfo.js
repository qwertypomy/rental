import { createReducer } from '../utils';
import { ACCOUNT_INFO_TOGGLE_BUTTON, EDIT, SAVE } from '../constants';

const initialState = {
  buttonText: EDIT
};

export default createReducer(initialState, {
    [ACCOUNT_INFO_TOGGLE_BUTTON]: (state, payload) => {
        return Object.assign({}, state, {
            buttonText: state.buttonText==EDIT?SAVE:EDIT
        });
    }
});
