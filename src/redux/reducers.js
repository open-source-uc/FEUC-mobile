import { combineReducers } from 'redux';

import hydratation from './modules/hydratation';
import nav from './modules/nav';
import entities from './modules/entities';
import events from './modules/events';
import benefits from './modules/benefits';
import initiatives from './modules/initiatives';
import delegationships from './modules/delegationships';
import notifications from './modules/notifications';

const reducer = combineReducers({
  hydratation,
  nav,
  entities,
  benefits,
  events,
  initiatives,
  delegationships,
  notifications,
});

export default reducer;
