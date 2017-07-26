import * as analytics from "./meta/analytics";

// Actions
export const CAMPUSES_FETCH = "feuc/campuses/CAMPUSES_FETCH";
export const CAMPUSES_FETCH_PENDING = "feuc/campuses/CAMPUSES_FETCH_PENDING";
export const CAMPUSES_FETCH_FULFILLED =
  "feuc/campuses/CAMPUSES_FETCH_FULFILLED";
export const CAMPUSES_FETCH_REJECTED = "feuc/campuses/CAMPUSES_FETCH_REJECTED";
export const CAMPUS_FETCH = "feuc/campuses/CAMPUS_FETCH";
export const CAMPUS_FETCH_PENDING = "feuc/campuses/CAMPUS_FETCH_PENDING";
export const CAMPUS_FETCH_FULFILLED = "feuc/campuses/CAMPUS_FETCH_FULFILLED";
export const CAMPUS_FETCH_REJECTED = "feuc/campuses/CAMPUS_FETCH_REJECTED";

// Initial state
const initialState = {
  result: [],
  error: null,
  refreshing: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CAMPUS_FETCH_PENDING:
    case CAMPUSES_FETCH_PENDING: {
      return {
        ...state,
        refreshing: true,
      };
    }
    case CAMPUS_FETCH_FULFILLED: {
      return {
        ...state,
        refreshing: false,
        error: null,
      };
    }
    case CAMPUSES_FETCH_FULFILLED: {
      return {
        ...state,
        result: action.payload.result,
        refreshing: false,
        error: null,
      };
    }
    case CAMPUS_FETCH_REJECTED:
    case CAMPUSES_FETCH_REJECTED: {
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
export const fetchCampuses = options => (dispatch, getState, { client }) =>
  dispatch({
    type: CAMPUSES_FETCH,
    payload: client.campuses(options),
    meta: {
      analytics: analytics.fetchResource("Campuses"),
    },
  });

export const fetchCampus = (id, options) => (dispatch, getState, { client }) =>
  dispatch({
    type: CAMPUS_FETCH,
    payload: client.campus(id, options),
    meta: {
      analytics: analytics.fetchResource("Campuses"),
    },
  });
