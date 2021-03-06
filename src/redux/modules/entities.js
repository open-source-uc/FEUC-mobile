// Actions
import {
  BENEFIT_FETCH_FULFILLED,
  BENEFITS_FETCH_FULFILLED,
  BENEFITS_FETCH_SAVED_FULFILLED,
  BENEFIT_ACTIVATION_FULFILLED,
} from "./benefits";
import { EVENT_FETCH_FULFILLED, EVENT_FETCH_SAVED_FULFILLED } from "./events";
import { INITIATIVE_FETCH_FULFILLED } from "./initiatives";
import { ATTENDANCES_FETCH_FULFILLED } from "./attendances";
import { DELEGATIONSHIP_FETCH_FULFILLED } from "./delegationships";
import { SURVEY_FETCH_FULFILLED } from "./surveys";
import { TAG_FETCH_FULFILLED } from "./tags";
import { SESSION_REGISTER_FULFILLED } from "./session";
import { NOTIFICATIONS_FETCH_FULFILLED } from "./notifications";
import { CAMPUS_FETCH_FULFILLED, CAMPUSES_FETCH_FULFILLED } from "./campuses";

// Initial state
const initialState = {
  benefits: {},
  events: {},
  delegationships: {},
  attendances: {},
  activations: {},
  initiatives: {},
  brands: {},
  surveys: {},
  tags: {},
  campuses: {},
  categories: {},
  places: {},
  notifications: {},
  devices: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_REGISTER_FULFILLED: {
      return {
        ...state,
        devices: {
          ...state.devices,
          ...action.payload.entities.devices,
        },
      };
    }
    case BENEFIT_ACTIVATION_FULFILLED:
    case BENEFIT_FETCH_FULFILLED:
    case BENEFITS_FETCH_SAVED_FULFILLED:
    case BENEFITS_FETCH_FULFILLED: {
      return {
        ...state,
        benefits: {
          ...state.benefits,
          ...action.payload.entities.benefits,
        },
        activations: {
          ...state.activations,
          ...action.payload.entities.activations,
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
    case TAG_FETCH_FULFILLED: {
      return {
        ...state,
        tags: {
          ...state.tags,
          ...action.payload.entities.tags,
        },
      };
    }
    case SURVEY_FETCH_FULFILLED: {
      return {
        ...state,
        surveys: {
          ...state.surveys,
          ...action.payload.entities.surveys,
        },
      };
    }
    case CAMPUS_FETCH_FULFILLED: {
      return {
        ...state,
        campuses: {
          ...state.campuses,
          ...action.payload.entities.campuses,
        },
        categories: {
          ...state.categories,
          ...action.payload.entities.categories,
        },
        places: {
          ...state.places,
          ...action.payload.entities.places,
        },
      };
    }
    case CAMPUSES_FETCH_FULFILLED: {
      return {
        ...state,
        campuses: {
          ...state.campuses,
          ...action.payload.entities.campuses,
        },
      };
    }
    case EVENT_FETCH_SAVED_FULFILLED:
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
    case ATTENDANCES_FETCH_FULFILLED: {
      return {
        ...state,
        attendances: {
          ...state.attendances,
          ...action.payload.entities.attendances,
        },
      };
    }
    case NOTIFICATIONS_FETCH_FULFILLED: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          ...action.payload.entities.notifications,
        },
      };
    }
    default: {
      return state;
    }
  }
}
