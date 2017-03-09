import uniq from 'lodash/uniq';


// Actions
export const TAG_FETCH = 'feuc/tags/TAG_FETCH';
export const TAG_FETCH_PENDING = 'feuc/tags/TAG_FETCH_PENDING';
export const TAG_FETCH_FULFILLED = 'feuc/tags/TAG_FETCH_FULFILLED';
export const TAG_FETCH_REJECTED = 'feuc/tags/TAG_FETCH_REJECTED';
export const TAG_SELECTION = 'feuc/tags/TAG_SELECTION';
export const TAG_DESELECTION = 'feuc/tags/TAG_DESELECTION';
export const TAG_CAMPUS_SELECTION = 'feuc/tags/TAG_CAMPUS_SELECTION';

// Initial state
const initialState = {
  result: [],
  selected: [],
  campus: null,
  error: null,
  refreshing: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TAG_SELECTION: {
      return {
        ...state,
        selected: uniq([...state.selected, action.payload]),
      };
    }
    case TAG_DESELECTION: {
      return {
        ...state,
        selected: state.selected.filter(item => item !== action.payload),
      };
    }
    case TAG_CAMPUS_SELECTION: {
      return {
        ...state,
        campus: action.payload,
      };
    }
    case TAG_FETCH_PENDING: {
      return {
        ...state,
        refreshing: true,
      };
    }
    case TAG_FETCH_FULFILLED: {
      return {
        ...state,
        result: action.payload.result,
        refreshing: false,
        error: null,
      };
    }
    case TAG_FETCH_REJECTED: {
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
export const fetchTags = options => (dispatch, getState, { client }) => dispatch({
  type: TAG_FETCH,
  payload: client.tags(options),
});

export const selectTag = tagId => ({
  type: TAG_SELECTION,
  payload: tagId,
});

export const deselectTag = tagId => ({
  type: TAG_DESELECTION,
  payload: tagId,
});

export const selectCampus = campusId => ({
  type: TAG_CAMPUS_SELECTION,
  payload: campusId,
});
