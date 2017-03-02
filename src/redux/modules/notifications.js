import { handleActions, createAction } from 'redux-actions';
import { normalize } from 'normalizr';

import * as schemas from '../../schemas';


// Actions
export const NOTIFICATION_ADD = 'feuc/notifications/NOTIFICATION_ADD';
export const NOTIFICATION_REGISTER = 'feuc/notifications/NOTIFICATION_REGISTER';
export const NOTIFICATION_REGISTER_PENDING = 'feuc/notifications/NOTIFICATION_REGISTER_PENDING';
export const NOTIFICATION_REGISTER_FULFILLED = 'feuc/notifications/NOTIFICATION_REGISTER_FULFILLED';
export const NOTIFICATION_REGISTER_REJECTED = 'feuc/notifications/NOTIFICATION_REGISTER_REJECTED';


// Initial state
const initialState = {
  entities: {},
  registration: null,
};


// Reducer
export default handleActions({
  [NOTIFICATION_REGISTER_FULFILLED]: (state, { payload }) => ({
    ...state,
    registration: payload,
  }),
  [NOTIFICATION_ADD]: (state, { payload }) => ({
    ...state,
    entities: {
      ...state.entities,
      ...payload.entities.notifications,
    },
  }),
}, initialState);


// Action creators
export const registerDevice = data => (dispatch, getState, { client }) => dispatch({
  type: NOTIFICATION_REGISTER,
  payload: client.register(data),
});

export const addNotification = createAction(NOTIFICATION_ADD, (notification) => {
  const notifications = [].concat(notification).map(notif => ({
    id: notif.payload.notificationID,
    ...notif,
  }));
  return normalize(notifications, [schemas.notification]);
});
