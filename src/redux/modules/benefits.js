// Actions
export const BENEFIT_FETCH = 'feuc/benefits/BENEFIT_FETCH';
export const BENEFIT_FETCH_PENDING = 'feuc/benefits/BENEFIT_FETCH_PENDING';
export const BENEFIT_FETCH_FULFILLED = 'feuc/benefits/BENEFIT_FETCH_FULFILLED';
export const BENEFIT_FETCH_REJECTED = 'feuc/benefits/BENEFIT_FETCH_REJECTED';


// Initial state
const initialState = {
  result: [],
  saved: [],
  error: null,
  refreshing: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BENEFIT_FETCH_PENDING: {
      return {
        ...state,
        refreshing: true,
      };
    }
    case BENEFIT_FETCH_FULFILLED: {
      return {
        ...state,
        result: action.payload.result,
        refreshing: false,
        error: null,
      };
    }
    case BENEFIT_FETCH_REJECTED: {
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
export const fetchBenefits = options => async (dispatch, getState, { client }) => dispatch({
  type: BENEFIT_FETCH,
  payload: client.benefits(options),
});
