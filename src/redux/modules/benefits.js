import uniq from "lodash/uniq";

// Actions
export const BENEFITS_FETCH = "feuc/benefits/BENEFITS_FETCH";
export const BENEFITS_FETCH_PENDING = "feuc/benefits/BENEFITS_FETCH_PENDING";
export const BENEFITS_FETCH_FULFILLED =
  "feuc/benefits/BENEFITS_FETCH_FULFILLED";
export const BENEFITS_FETCH_REJECTED = "feuc/benefits/BENEFITS_FETCH_REJECTED";

export const BENEFIT_FETCH = "feuc/benefits/BENEFIT_FETCH";
export const BENEFIT_FETCH_FULFILLED = "feuc/benefits/BENEFIT_FETCH_FULFILLED";

export const BENEFITS_FETCH_SAVED = "feuc/benefits/BENEFITS_FETCH_SAVED";
export const BENEFITS_FETCH_SAVED_PENDING =
  "feuc/benefits/BENEFITS_FETCH_SAVED_PENDING";
export const BENEFITS_FETCH_SAVED_FULFILLED =
  "feuc/benefits/BENEFITS_FETCH_SAVED_FULFILLED";
export const BENEFITS_FETCH_SAVED_REJECTED =
  "feuc/benefits/BENEFITS_FETCH_SAVED_REJECTED";

export const BENEFIT_ACTIVATION_PENDING =
  "feuc/benefits/BENEFIT_ACTIVATION_PENDING";
export const BENEFIT_ACTIVATION_FULFILLED =
  "feuc/benefits/BENEFIT_ACTIVATION_FULFILLED";
export const BENEFIT_ACTIVATION_REJECTED =
  "feuc/benefits/BENEFIT_ACTIVATION_REJECTED";

// Initial state
const initialState = {
  result: [],
  saved: [], // BenefitActivation (activations) ids
  status: {
    // benefitId: loading|error|saved
  },
  error: null,
  refreshing: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BENEFITS_FETCH_SAVED_PENDING:
    case BENEFITS_FETCH_PENDING: {
      return {
        ...state,
        refreshing: true,
      };
    }
    case BENEFITS_FETCH_FULFILLED: {
      return {
        ...state,
        result: action.payload.result,
        refreshing: false,
        error: null,
      };
    }
    case BENEFITS_FETCH_SAVED_FULFILLED: {
      return {
        ...state,
        refreshing: false,
        error: null,
      };
    }
    case BENEFITS_FETCH_SAVED_REJECTED:
    case BENEFITS_FETCH_REJECTED: {
      return {
        ...state,
        refreshing: false,
        error: action.payload,
      };
    }
    case BENEFIT_ACTIVATION_PENDING: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload.benefitId]: "loading",
        },
      };
    }
    case BENEFIT_ACTIVATION_REJECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload.benefitId]: "error",
        },
      };
    }
    case BENEFIT_ACTIVATION_FULFILLED: {
      return {
        ...state,
        saved: uniq([...state.saved, action.payload.result]).filter(Boolean),
        status: {
          ...state.status,
          [action.payload.benefitId]: "saved",
        },
      };
    }
    default: {
      return state;
    }
  }
}

// Action creators
export const fetchBenefit = (benefitId, options) => (
  dispatch,
  getState,
  { client }
) =>
  dispatch({
    type: BENEFIT_FETCH,
    payload: client.benefit(benefitId, options),
  });

export const fetchBenefits = options => (dispatch, getState, { client }) =>
  dispatch({
    type: BENEFITS_FETCH,
    payload: client.benefits(options),
  });

export const fetchBenefitsSaved = (ids, options) => (
  dispatch,
  getState,
  { client }
) =>
  dispatch({
    type: BENEFITS_FETCH_SAVED,
    payload: client.benefits({
      qs: {
        _id: ids,
      },
      ...options,
    }),
  });

export const activateBenefit = (benefitId, data) => (
  dispatch,
  getState,
  { client }
) => {
  dispatch({
    type: BENEFIT_ACTIVATION_PENDING,
    payload: {
      benefitId,
    },
  });

  return client
    .benefitActivate(benefitId, data, {
      headers: {
        "X-FEUC-ID": getState().session.result,
      },
    })
    .then(response =>
      dispatch({
        type: BENEFIT_ACTIVATION_FULFILLED,
        payload: { ...response, benefitId },
      })
    )
    .catch(err =>
      dispatch({
        type: BENEFIT_ACTIVATION_REJECTED,
        payload: {
          ...err,
          benefitId,
        },
        error: true,
      })
    );
};
