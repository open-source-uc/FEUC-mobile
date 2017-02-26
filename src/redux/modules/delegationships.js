// Actions
export const DELEGATIONSHIP_FETCH = 'feuc/delegationships/DELEGATIONSHIP_FETCH';
export const DELEGATIONSHIP_FETCH_PENDING = 'feuc/delegationships/DELEGATIONSHIP_FETCH_PENDING';
export const DELEGATIONSHIP_FETCH_FULFILLED = 'feuc/delegationships/DELEGATIONSHIP_FETCH_FULFILLED';
export const DELEGATIONSHIP_FETCH_REJECTED = 'feuc/delegationships/DELEGATIONSHIP_FETCH_REJECTED';


// Initial state
const initialState = {
  result: [],
  saved: [],
  error: null,
  refreshing: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DELEGATIONSHIP_FETCH_PENDING: {
      return {
        ...state,
        refreshing: true,
      };
    }
    case DELEGATIONSHIP_FETCH_FULFILLED: {
      return {
        ...state,
        result: action.payload.result,
        refreshing: false,
        error: null,
      };
    }
    case DELEGATIONSHIP_FETCH_REJECTED: {
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
export const fetchDelegationships = options => async (dispatch, getState, { client }) => dispatch({
  type: DELEGATIONSHIP_FETCH,
  payload: client.delegationships(options),
});
