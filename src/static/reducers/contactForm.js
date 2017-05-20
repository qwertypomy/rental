import { createReducer } from '../utils';
import { CONTACT_FORM_SET_VALUES } from '../constants';

const initialState = {
  formValues: null
};

export default createReducer(initialState, {
    [CONTACT_FORM_SET_VALUES]: (state, payload) => {
        return Object.assign({}, state, {
            formValues: payload.formValues
        });
    }
});
