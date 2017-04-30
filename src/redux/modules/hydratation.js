import { persistStore } from "redux-persist";

// Actions
export const HYDRATATION = "feuc/hydratation/HYDRATATION";
export const HYDRATATION_PENDING = "feuc/hydratation/HYDRATATION_PENDING";
export const HYDRATATION_FULFILLED = "feuc/hydratation/HYDRATATION_FULFILLED";
export const HYDRATATION_REJECTED = "feuc/hydratation/HYDRATATION_REJECTED";

// Initial state
const initialState = {
  done: false,
  persistor: null,
  error: null,
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HYDRATATION_PENDING: {
      return {
        ...state,
        done: false,
      };
    }
    case HYDRATATION_FULFILLED: {
      return {
        ...state,
        error: null,
        persistor: action.payload,
        done: true,
      };
    }
    case HYDRATATION_REJECTED: {
      return {
        ...state,
        error: action.payload,
        done: true,
      };
    }
    default: {
      return state;
    }
  }
}

// Action creators
export const hydrate = (store, options) => {
  const promise = new Promise((resolve, reject) => {
    const persistor = persistStore(store, options, err => {
      if (err) reject(err);
      else resolve(persistor);
    });
    // To clear the store:
    // persistor.purge();
  });

  return {
    type: HYDRATATION,
    payload: promise,
  };
};
