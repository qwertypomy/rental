import { ACCOUNT_INFO_TOGGLE_BUTTON } from '../constants';

export function accountInfoToggleButton() {
  return (dispatch, state) =>
    dispatch({ type: ACCOUNT_INFO_TOGGLE_BUTTON });
}
