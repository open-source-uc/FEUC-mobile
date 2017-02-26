// Actions
import { BENEFIT_FETCH_FULFILLED } from './benefits';
import { EVENT_FETCH_FULFILLED } from './events';
import { INITIATIVE_FETCH_FULFILLED } from './initiatives';
import { DELEGATIONSHIP_FETCH_FULFILLED } from './delegationships';


// Initial state
const initialState = {
  benefits: {},
  events: {},
  delegationships: {},
  initiatives: {},
  brands: {},
  tags: {},
  campuses: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BENEFIT_FETCH_FULFILLED: {
      return {
        ...state,
        benefits: {
          ...state.benefits,
          ...action.payload.entities.benefits,
        },
        brands: {
          ...state.brands,
          ...action.payload.entities.brands,
        },
      };
    }
    case INITIATIVE_FETCH_FULFILLED: {
      return {
        ...state,
        initiatives: {
          ...state.initiatives,
          ...action.payload.entities.initiatives,
        },
      };
    }
    case DELEGATIONSHIP_FETCH_FULFILLED: {
      return {
        ...state,
        delegationships: {
          ...state.delegationships,
          ...action.payload.entities.delegationships,
        },
      };
    }
    case EVENT_FETCH_FULFILLED: {
      return {
        ...state,
        events: {
          ...state.events,
          ...action.payload.entities.events,
        },
        tags: {
          ...state.tags,
          ...action.payload.entities.tags,
        },
        campuses: {
          ...state.campuses,
          ...action.payload.entities.campuses,
        },
        initiatives: {
          ...state.initiatives,
          ...action.payload.entities.initiatives,
        },
        delegationships: {
          ...state.delegationships,
          ...action.payload.entities.delegationships,
        },
      };
    }
    default: {
      return state;
    }
  }
}
