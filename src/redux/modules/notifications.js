import * as analytics from "./meta/analytics";

// Actions
export const NOTIFICATIONS_FETCH = "feuc/notifications/NOTIFICATIONS_FETCH";
export const NOTIFICATIONS_FETCH_PENDING =
  "feuc/notifications/NOTIFICATIONS_FETCH_PENDING";
export const NOTIFICATIONS_FETCH_FULFILLED =
  "feuc/notifications/NOTIFICATIONS_FETCH_FULFILLED";
export const NOTIFICATIONS_FETCH_REJECTED =
  "feuc/notifications/NOTIFICATIONS_FETCH_REJECTED";

export const NOTIFICATION_OPENED = "feuc/notifications/NOTIFICATION_OPENED";
export const NOTIFICATION_REGISTER = "feuc/notifications/NOTIFICATION_REGISTER";
export const NOTIFICATION_SEEN = "feuc/notifications/NOTIFICATION_SEEN";
export const NOTIFICATION_SET_ENABLED =
  "feuc/notifications/NOTIFICATION_SET_ENABLED";

// Initial state
const initialState = {
  result: [],
  enabled: true,
  refreshing: false,
  seen: {},
  error: null,
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_FETCH_PENDING: {
      return {
        ...state,
        refreshing: true,
      };
    }
    case NOTIFICATIONS_FETCH_FULFILLED: {
      return {
        ...state,
        result: action.payload.result,
        refreshing: false,
        error: null,
      };
    }
    case NOTIFICATIONS_FETCH_REJECTED: {
      return {
        ...state,
        refreshing: false,
        error: action.payload,
      };
    }
    case NOTIFICATION_SET_ENABLED: {
      return {
        ...state,
        enabled: action.payload,
      };
    }
    case NOTIFICATION_SEEN: {
      return {
        ...state,
        seen: {
          ...state.seen,
          [action.payload.notification._id]: action.payload.seen,
        },
      };
    }
    default: {
      return state;
    }
  }
}

// Action creators
export const setEnabled = isEnabled => ({
  type: NOTIFICATION_SET_ENABLED,
  payload: isEnabled,
});

export const fetchNotifications = options => (dispatch, getState, { client }) =>
  dispatch({
    type: NOTIFICATIONS_FETCH,
    payload: client.notifications(options),
    meta: {
      analytics: analytics.fetchResource("Notifications"),
    },
  });

export const viewNotification = (notification, seen = true) => ({
  type: NOTIFICATION_SEEN,
  payload: { notification, seen },
  meta: {
    analytics: analytics.userAction(`Notification view: ${notification._id}`),
  },
});

export const notificationOpen = notification => ({
  type: NOTIFICATION_OPENED,
  payload: notification,
});
