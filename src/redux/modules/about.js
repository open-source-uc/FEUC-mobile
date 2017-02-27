// Actions
export const ABOUT_FETCH = 'feuc/about/ABOUT_FETCH';
export const ABOUT_FETCH_PENDING = 'feuc/about/ABOUT_FETCH_PENDING';
export const ABOUT_FETCH_FULFILLED = 'feuc/about/ABOUT_FETCH_FULFILLED';
export const ABOUT_FETCH_REJECTED = 'feuc/about/ABOUT_FETCH_REJECTED';


// Initial state
const initialState = {
  content: null,
  refreshing: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ABOUT_FETCH_PENDING: {
      return {
        ...state,
        refreshing: true,
      };
    }
    case ABOUT_FETCH_FULFILLED: {
      return {
        content: action.payload,
        refreshing: false,
        error: null,
      };
    }
    case ABOUT_FETCH_REJECTED: {
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
export const fetchAbout = options => async (dispatch, getState, { client }) => dispatch({
  type: ABOUT_FETCH,
  payload: client.about(options),
});
