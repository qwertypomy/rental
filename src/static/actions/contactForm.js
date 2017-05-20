import { CONTACT_FORM_SET_VALUES } from '../constants';

export function contactFormSetValues(formValues) {
  return (dispatch, state) =>
    dispatch({ type: CONTACT_FORM_SET_VALUES, payload: { formValues } });
}
