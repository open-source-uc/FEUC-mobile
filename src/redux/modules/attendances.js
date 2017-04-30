// Actions
export const ATTENDANCES_FETCH = "feuc/attendances/ATTENDANCES_FETCH";
export const ATTENDANCES_FETCH_PENDING =
  "feuc/attendances/ATTENDANCES_FETCH_PENDING";
export const ATTENDANCES_FETCH_FULFILLED =
  "feuc/attendances/ATTENDANCES_FETCH_FULFILLED";
export const ATTENDANCES_FETCH_REJECTED =
  "feuc/attendances/ATTENDANCES_FETCH_REJECTED";

// Initial state
const initialState = {
  result: [],
  saved: [],
  error: null,
  refreshing: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ATTENDANCES_FETCH_PENDING: {
      return {
        ...state,
        refreshing: true,
      };
    }
    case ATTENDANCES_FETCH_FULFILLED: {
      return {
        ...state,
        result: action.payload.result,
        refreshing: false,
        error: null,
      };
    }
    case ATTENDANCES_FETCH_REJECTED: {
      return {
        ...state,
        refreshing: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

// Action creators
export const fetchAttendances = options => (dispatch, getState, { client }) =>
  dispatch({
    type: ATTENDANCES_FETCH,
    payload: client.attendances(options),
  });
