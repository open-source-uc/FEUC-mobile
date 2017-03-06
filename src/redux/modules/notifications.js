import { normalize } from 'normalizr';

import * as schemas from '../../schemas';


// Actions
export const NOTIFICATION_RECEIVED = 'feuc/notifications/NOTIFICATION_RECEIVED';
export const NOTIFICATION_REGISTER = 'feuc/notifications/NOTIFICATION_REGISTER';
export const NOTIFICATION_REGISTER_PENDING = 'feuc/notifications/NOTIFICATION_REGISTER_PENDING';
export const NOTIFICATION_REGISTER_FULFILLED = 'feuc/notifications/NOTIFICATION_REGISTER_FULFILLED';
export const NOTIFICATION_REGISTER_REJECTED = 'feuc/notifications/NOTIFICATION_REGISTER_REJECTED';


// Initial state
const initialState = {
  result: [],
  registration: null,
};


// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_REGISTER_FULFILLED: {
      return {
        ...state,
        registration: action.payload,
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
export const registerDevice = data => (dispatch, getState, { client }) => dispatch({
  type: NOTIFICATION_REGISTER,
  payload: client.register(data),
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
