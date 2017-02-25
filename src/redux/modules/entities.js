// Actions
import {
  BENEFIT_FETCH_FULFILLED,
} from './benefits';


// Initial state
const initialState = {
  benefits: {},
  events: {},
  delegationships: {},
  initiatives: {},
  brands: {},
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
    default: {
      return state;
    }
  }
}
