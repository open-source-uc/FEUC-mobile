import { combineReducers } from 'redux';

import hydratation from './modules/hydratation';
import nav from './modules/nav';
import notifications from './modules/notifications';

const reducer = combineReducers({
  hydratation,
  nav,
  notifications,
});

export default reducer;
