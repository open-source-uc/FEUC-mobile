import { normalize } from 'normalizr';

import * as schemas from '../../schemas';


// Actions
export const NOTIFICATION_RECEIVED = 'feuc/notifications/NOTIFICATION_RECEIVED';
export const NOTIFICATION_REGISTER = 'feuc/notifications/NOTIFICATION_REGISTER';
export const NOTIFICATION_SET_ENABLED = 'feuc/notifications/NOTIFICATION_SET_ENABLED';


// Initial state
const initialState = {
  result: [],
  enabled: false,
};


// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_SET_ENABLED: {
      return {
        ...state,
        enabled: action.payload,
      };
    }
    case NOTIFICATION_RECEIVED: {
      return {
        ...state,
        result: action.payload.result,
      };
    }
    default: {
      return state;
    }
  }
}

// Action creators
export const setEnabled = (isEnabled) => ({
  type: NOTIFICATION_SET_ENABLED,
  payload: isEnabled,
});

export const receiveNotification = (data) => {
  const notifications = [].concat(data).map(notif => ({
    id: notif.payload.notificationID,
    ...notif,
  }));
  return {
    type: NOTIFICATION_RECEIVED,
    payload: normalize(notifications, [schemas.notification]),
  };
};
