import { combineReducers } from 'redux';

import hydratation from './modules/hydratation';
import nav from './modules/nav';
import notifications from './modules/notifications';
import datastore from './modules/datastore';

const reducer = combineReducers({
  hydratation,
  nav,
  notifications,
  datastore,
});

export default reducer;
