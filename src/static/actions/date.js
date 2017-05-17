import { DATE_SET_DATE_RANGE } from '../constants';

export function dateSetDateRange(dateRange) {
  return (dispatch, state) =>
    dispatch({ type: DATE_SET_DATE_RANGE, payload: { dateRange } });
}
