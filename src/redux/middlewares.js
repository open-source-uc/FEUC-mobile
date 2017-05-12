import createAnalytics from "redux-analytics";
import { NavigationActions } from "react-navigation";

export function analytics(tracker) {
  return createAnalytics(({ type, payload }) => {
    if (type && payload) {
      tracker.trackEvent(type, payload.action, payload.values);
    }
  });
}

// See: https://github.com/react-community/react-navigation/blob/master/docs/guides/Screen-Tracking.md#screen-tracking-with-redux
export function screenTracking(tracker) {
  function getCurrentRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // Dive into nested navigators
    if (route.routes) {
      return getCurrentRouteName(route);
    }
    return route.routeName;
  }

  return ({ getState }) => next => action => {
    if (
      action.type !== NavigationActions.NAVIGATE &&
      action.type !== NavigationActions.BACK
    ) {
      return next(action);
    }

    const currentScreen = getCurrentRouteName(getState().nav);
    const result = next(action);
    const nextScreen = getCurrentRouteName(getState().nav);
    if (nextScreen !== currentScreen) {
      tracker.trackScreenView(nextScreen);
    }
    return result;
  };
}
