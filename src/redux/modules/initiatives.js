// Actions
export const INITIATIVE_FETCH = 'feuc/initiatives/INITIATIVE_FETCH';
export const INITIATIVE_FETCH_PENDING = 'feuc/initiatives/INITIATIVE_FETCH_PENDING';
export const INITIATIVE_FETCH_FULFILLED = 'feuc/initiatives/INITIATIVE_FETCH_FULFILLED';
export const INITIATIVE_FETCH_REJECTED = 'feuc/initiatives/INITIATIVE_FETCH_REJECTED';


// Initial state
const initialState = {
  result: [],
  saved: [],
  error: null,
  refreshing: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INITIATIVE_FETCH_PENDING: {
      return {
        ...state,
        refreshing: true,
      };
    }
    case INITIATIVE_FETCH_FULFILLED: {
      return {
        ...state,
        result: action.payload.result,
        refreshing: false,
        error: null,
      };
    }
    case INITIATIVE_FETCH_REJECTED: {
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
export const fetchInitiatives = options => async (dispatch, getState, { client }) => dispatch({
  type: INITIATIVE_FETCH,
  payload: client.initiatives(options),
});
