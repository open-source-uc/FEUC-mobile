import Bluebird from "bluebird";
import get from "lodash/get";

// Actions
export const SURVEY_FETCH = "feuc/surveys/SURVEY_FETCH";
export const SURVEY_FETCH_PENDING = "feuc/surveys/SURVEY_FETCH_PENDING";
export const SURVEY_FETCH_FULFILLED = "feuc/surveys/SURVEY_FETCH_FULFILLED";
export const SURVEY_FETCH_REJECTED = "feuc/surveys/SURVEY_FETCH_REJECTED";

export const SURVEY_SELECTION = "feuc/surveys/SURVEY_SELECTION";
export const SURVEY_SELECTION_PENDING = "feuc/surveys/SURVEY_SELECTION_PENDING";
export const SURVEY_SELECTION_FULFILLED =
  "feuc/surveys/SURVEY_SELECTION_FULFILLED";
export const SURVEY_SELECTION_REJECTED =
  "feuc/surveys/SURVEY_SELECTION_REJECTED";

// Initial state
const initialState = {
  result: [],
  saved: [],
  error: null,
  refreshing: false,

  // Voting
  selected: {},
  selecting: {},
  errors: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SURVEY_FETCH_PENDING: {
      return {
        ...state,
        refreshing: true,
      };
    }
    case SURVEY_FETCH_FULFILLED: {
      return {
        ...state,
        result: action.payload.result,
        refreshing: false,
        error: null,
      };
    }
    case SURVEY_FETCH_REJECTED: {
      return {
        ...state,
        refreshing: false,
        error: action.payload,
      };
    }
    case SURVEY_SELECTION_PENDING: {
      return {
        ...state,
        selecting: {
          ...state.selecting,
          [action.meta.surveyId]: true,
        },
      };
    }
    case SURVEY_SELECTION_FULFILLED: {
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.meta.surveyId]: get(action.payload, [
            "entities",
            "votes",
            action.payload.result,
          ]),
        },
        selecting: {
          ...state.selecting,
          [action.meta.surveyId]: undefined,
        },
        errors: {
          ...state.errors,
          [action.meta.surveyId]: undefined,
        },
      };
    }
    case SURVEY_SELECTION_REJECTED: {
      return {
        ...state,
        selecting: {
          ...state.selecting,
          [action.meta.surveyId]: undefined,
        },
        errors: {
          ...state.errors,
          [action.meta.surveyId]: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
}

// Action creators
export const fetchSurveys = options => (dispatch, getState, { client }) =>
  dispatch({
    type: SURVEY_FETCH,
    payload: client.surveys(options),
  });

export const selectSurveyOption = (surveyId, vote) => (
  dispatch,
  getState,
  { client }
) => {
  const promise = client.surveySelect(surveyId, vote, {
    headers: {
      "X-FEUC-ID": getState().session.result,
    },
  });

  dispatch({
    type: SURVEY_SELECTION,
    meta: { surveyId },
    // Make always take from 1500 ms and up (UX)
    payload: Bluebird.all([promise, Bluebird.delay(1500)]).then(
      array => array[0]
    ),
  });
};
