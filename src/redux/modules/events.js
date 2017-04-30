import uniq from "lodash/uniq";

// Actions
export const EVENT_FETCH = "feuc/events/EVENT_FETCH";
export const EVENT_FETCH_PENDING = "feuc/events/EVENT_FETCH_PENDING";
export const EVENT_FETCH_FULFILLED = "feuc/events/EVENT_FETCH_FULFILLED";
export const EVENT_FETCH_REJECTED = "feuc/events/EVENT_FETCH_REJECTED";

export const EVENT_FETCH_SAVED = "feuc/events/EVENT_FETCH_SAVED";
export const EVENT_FETCH_SAVED_PENDING =
  "feuc/events/EVENT_FETCH_SAVED_PENDING";
export const EVENT_FETCH_SAVED_FULFILLED =
  "feuc/events/EVENT_FETCH_SAVED_FULFILLED";
export const EVENT_FETCH_SAVED_REJECTED =
  "feuc/events/EVENT_FETCH_SAVED_REJECTED";

export const EVENT_SAVE = "feuc/events/EVENT_SAVE";
export const EVENT_REMOVE = "feuc/events/EVENT_REMOVE";

// Initial state
const initialState = {
  result: [],
  saved: [],
  error: null,
  refreshing: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_FETCH_SAVED_PENDING:
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
    case EVENT_FETCH_SAVED_FULFILLED: {
      return {
        ...state,
        refreshing: false,
        error: null,
      };
    }
    case EVENT_FETCH_SAVED_REJECTED:
    case EVENT_FETCH_REJECTED: {
      return {
        ...state,
        refreshing: false,
        error: action.payload,
      };
    }
    case EVENT_SAVE: {
      return {
        ...state,
        saved: uniq([...state.saved, action.payload]),
      };
    }
    case EVENT_REMOVE: {
      return {
        ...state,
        saved: state.saved.filter(_id => _id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
}

// Action creators
export const fetchEvents = options => (dispatch, getState, { client }) =>
  dispatch({
    type: EVENT_FETCH,
    payload: client.events(options),
  });

export const fetchEventsSaved = options => (dispatch, getState, { client }) =>
  dispatch({
    type: EVENT_FETCH_SAVED,
    payload: client.events({
      qs: {
        _id: getState().events.saved, // an array
      },
      ...options,
    }),
  });

export const saveEvent = eventId => ({
  type: EVENT_SAVE,
  payload: eventId,
});

export const removeEvent = eventId => ({
  type: EVENT_REMOVE,
  payload: eventId,
});
