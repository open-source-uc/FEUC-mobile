import { handleActions } from 'redux-actions';


// Actions
export const BENEFIT_FETCH = 'feuc/benefits/BENEFIT_FETCH';
export const BENEFIT_FETCH_PENDING = 'feuc/benefits/BENEFIT_FETCH_PENDING';
export const BENEFIT_FETCH_FULFILLED = 'feuc/benefits/BENEFIT_FETCH_FULFILLED';
export const BENEFIT_FETCH_REJECTED = 'feuc/benefits/BENEFIT_FETCH_REJECTED';


// Initial state
const initialState = {
  benefits: {
    result: [],
    entities: {},
    refreshing: false,
    error: null,
  },
  events: {
    result: [],
    entities: {},
    refreshing: false,
    error: null,
  },
  delegationships: {
    result: [],
    entities: {},
    refreshing: false,
    error: null,
  },
  initiatives: {
    result: [],
    entities: {},
    refreshing: false,
    error: null,
  },
  brands: {
    result: [],
    entities: {},
    refreshing: false,
    error: null,
  },
};


// Reducer
export default handleActions({
  [BENEFIT_FETCH_PENDING]: (state, { payload }) => ({
    ...state,
    benefits: {
      ...state.benefits,
      refreshing: true,
    },
  }),
  [BENEFIT_FETCH_FULFILLED]: (state, { payload }) => ({
    ...state,
    benefits: {
      ...state.benefits,
      entities: {
        ...state.benefits.entities,
        ...payload.entities.benefits,
      },
      result: payload.result, // TODO merge?
      refreshing: false,
      error: null,
    },
  }),
  [BENEFIT_FETCH_REJECTED]: (state, { payload }) => ({
    ...state,
    benefits: {
      ...state.benefits,
      refreshing: false,
      error: payload,
    },
  }),
}, initialState);


// Action creators
export const fetchBenefits = options => async (dispatch, getState, { client }) => dispatch({
  type: BENEFIT_FETCH,
  payload: client.benefits(options),
});
