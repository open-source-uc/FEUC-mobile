// Actions
export const SESSION_REGISTER = 'feuc/session/SESSION_REGISTER';
export const SESSION_REGISTER_PENDING = 'feuc/session/SESSION_REGISTER_PENDING';
export const SESSION_REGISTER_FULFILLED = 'feuc/session/SESSION_REGISTER_FULFILLED';
export const SESSION_REGISTER_REJECTED = 'feuc/session/SESSION_REGISTER_REJECTED';


// Initial state
const initialState = {
  result: null, // Current device ID
};


// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_REGISTER_FULFILLED: {
      return {
        ...state,
        result: action.payload.result,
      };
    }
    default: {
      return state;
    }
  }
}


// Action creators
export const register = (data, options) => (dispatch, getState, { client }) => dispatch({
  type: SESSION_REGISTER,
  payload: client.register(data, options),
});
