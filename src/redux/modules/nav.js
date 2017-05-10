import { NavigationActions } from "react-navigation";
import get from "lodash/get";

import Navigator from "../../navigation/Navigator";
import { NOTIFICATION_SEEN } from "./notifications";

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
      }

      const navAction = NavigationActions.navigate({
        params: { _id: id },
        routeName: MAPPING[kind],
      });
      return Navigator.router.getStateForAction(navAction, state) || state;
    }
    default: {
      return Navigator.router.getStateForAction(action, state) || state;
    }
  }
}
