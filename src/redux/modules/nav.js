import { Linking } from "react-native";
import { NavigationActions } from "react-navigation";
import get from "lodash/get";

import Navigator from "../../navigation/Navigator";
import { NOTIFICATION_OPENED, NOTIFICATION_SEEN } from "./notifications";

const MAPPING = {
  event: "Event",
  benefit: "Benefit",
  initiative: "Initiative",
  delegationship: "Delegationship",
  survey: "Survey",
};

export default function reducer(state, action) {
  switch (action.type) {
    case NOTIFICATION_SEEN: {
      const kind = get(action.payload, ["notification", "action", "kind"]);
      const id =
        get(action.payload, ["notification", "action", kind, "_id"]) ||
        get(action.payload, ["notification", "action", kind]);

      if (!kind || !id) {
        return state;
      } else if (MAPPING[kind]) {
        const navAction = NavigationActions.navigate({
          params: { _id: id },
          routeName: MAPPING[kind],
        });
        return Navigator.router.getStateForAction(navAction, state) || state;
      } else if (kind === "url") {
        try {
          Linking.openURL(id); // id = url
        } catch (err) {
          alert(`Hubo un problema abriendo la URL: ${id}`); // eslint-disable-line
        }
        return state;
      } else if (kind === "text") {
        const navAction = NavigationActions.navigate({
          params: {
            text: id, // id = text
            title: get(action.payload, ["notification", "title"]), // TODO: show title
          },
          routeName: "NotificationText",
        });
        return Navigator.router.getStateForAction(navAction, state) || state;
      } else {
        return state;
      }
    }
    case NOTIFICATION_OPENED: {
      const navAction = NavigationActions.navigate({
        routeName: "Notifications",
      });
      // TODO: If current route is 'Notifications', what would happen?
      return Navigator.router.getStateForAction(navAction, state) || state;
    }
    default: {
      return Navigator.router.getStateForAction(action, state) || state;
    }
  }
}
