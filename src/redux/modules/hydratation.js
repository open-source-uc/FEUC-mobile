/* eslint no-unused-vars: 0 */

import { handleActions, createAction } from 'redux-actions';
import { persistStore } from 'redux-persist';


// Actions
export const HYDRATATION = 'feuc/hydratation/HYDRATATION';
export const HYDRATATION_PENDING = 'feuc/hydratation/HYDRATATION_PENDING';
export const HYDRATATION_FULFILLED = 'feuc/hydratation/HYDRATATION_FULFILLED';
export const HYDRATATION_REJECTED = 'feuc/hydratation/HYDRATATION_REJECTED';


// Initial state
const initialState = {
  done: false,
  persistor: null,
  error: null,
};


// Reducer
export default handleActions({
  [HYDRATATION_PENDING]: (state, { payload }) => ({
    ...state,
    done: false,
  }),

  [HYDRATATION_FULFILLED]: (state, { payload }) => ({
    error: null,
    persistor: payload,
    done: true,
  }),

  [HYDRATATION_REJECTED]: (state, { payload }) => ({
    error: payload,
  }),

}, initialState);


// Action creators
export const hydrate = createAction(HYDRATATION, (store, options) => {
  const promise = new Promise((resolve, reject) => {
    const persistor = persistStore(store, options, (err, restored) => {
      if (err) reject(err);
      else resolve(persistor);
    });
    // To clear the store:
    // persistor.purge();
  });

  return promise;
});
