import { combineReducers } from 'redux';

import hydratation from './modules/hydratation';
import nav from './modules/nav';
import entities from './modules/entities';
import benefits from './modules/benefits';
import notifications from './modules/notifications';

const reducer = combineReducers({
  hydratation,
  nav,
  entities,
  benefits,
  notifications,
});

export default reducer;
