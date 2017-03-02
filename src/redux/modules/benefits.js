import uniq from 'lodash/uniq';

// Actions
export const BENEFIT_FETCH = 'feuc/benefits/BENEFIT_FETCH';
export const BENEFIT_FETCH_PENDING = 'feuc/benefits/BENEFIT_FETCH_PENDING';
export const BENEFIT_FETCH_FULFILLED = 'feuc/benefits/BENEFIT_FETCH_FULFILLED';
export const BENEFIT_FETCH_REJECTED = 'feuc/benefits/BENEFIT_FETCH_REJECTED';

export const BENEFIT_FETCH_SAVED = 'feuc/benefits/BENEFIT_FETCH_SAVED';
export const BENEFIT_FETCH_SAVED_PENDING = 'feuc/benefits/BENEFIT_FETCH_SAVED_PENDING';
export const BENEFIT_FETCH_SAVED_FULFILLED = 'feuc/benefits/BENEFIT_FETCH_SAVED_FULFILLED';
export const BENEFIT_FETCH_SAVED_REJECTED = 'feuc/benefits/BENEFIT_FETCH_SAVED_REJECTED';

export const BENEFIT_SAVE = 'feuc/benefits/BENEFIT_SAVE';
export const BENEFIT_REMOVE = 'feuc/benefits/BENEFIT_REMOVE';


// Initial state
const initialState = {
  result: [],
  saved: [],
  error: null,
  refreshing: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BENEFIT_FETCH_SAVED_PENDING:
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
    case BENEFIT_FETCH_SAVED_FULFILLED: {
      return {
        ...state,
        refreshing: false,
        error: null,
      };
    }
    case BENEFIT_FETCH_SAVED_REJECTED:
    case BENEFIT_FETCH_REJECTED: {
      return {
        ...state,
        refreshing: false,
        error: action.payload,
      };
    }
    case BENEFIT_SAVE: {
      return {
        ...state,
        saved: uniq([...state.saved, action.payload]),
      };
    }
    case BENEFIT_REMOVE: {
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
export const fetchBenefits = options => (dispatch, getState, { client }) => dispatch({
  type: BENEFIT_FETCH,
  payload: client.benefits(options),
});

export const fetchBenefitsSaved = options => (dispatch, getState, { client }) => dispatch({
  type: BENEFIT_FETCH_SAVED,
  payload: client.benefits({
    qs: {
      _id: getState().benefits.saved, // an array
    },
    ...options,
  }),
});

export const saveBenefit = benefitId => ({
  type: BENEFIT_SAVE,
  payload: benefitId,
});

export const removeBenefit = benefitId => ({
  type: BENEFIT_REMOVE,
  payload: benefitId,
});
