import { combineReducers } from "redux";

import hydratation from "./modules/hydratation";
import nav from "./modules/nav";
import entities from "./modules/entities";
import session from "./modules/session";
import events from "./modules/events";
import benefits from "./modules/benefits";
import initiatives from "./modules/initiatives";
import delegationships from "./modules/delegationships";
import attendances from "./modules/attendances";
import tags from "./modules/tags";
import surveys from "./modules/surveys";
import notifications from "./modules/notifications";
import campuses from "./modules/campuses";
import about from "./modules/about";

const reducer = combineReducers({
  session,
  hydratation,
  nav,
  entities,
  benefits,
  events,
  initiatives,
  delegationships,
  attendances,
  tags,
  surveys,
  notifications,
  campuses,
  about,
});

export default reducer;
