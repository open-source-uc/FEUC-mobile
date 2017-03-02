// Actions
export const EVENT_FETCH = 'feuc/events/EVENT_FETCH';
export const EVENT_FETCH_PENDING = 'feuc/events/EVENT_FETCH_PENDING';
export const EVENT_FETCH_FULFILLED = 'feuc/events/EVENT_FETCH_FULFILLED';
export const EVENT_FETCH_REJECTED = 'feuc/events/EVENT_FETCH_REJECTED';


// Initial state
const initialState = {
  result: [],
  saved: [],
  error: null,
  refreshing: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_FETCH_PENDING: {
      return {
        ...state,
        refreshing: true,
      };
    }
    case EVENT_FETCH_FULFILLED: {
      return {
        ...state,
        result: action.payload.result,
        refreshing: false,
        error: null,
      };
    }
    case EVENT_FETCH_REJECTED: {
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
export const fetchEvents = options => (dispatch, getState, { client }) => dispatch({
  type: EVENT_FETCH,
  payload: client.events(options),
});
