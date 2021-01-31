// System
import { combineReducers } from 'redux';
// Reducers
import requestReducer from '../utils/request/requestReducer';
import dashboardReducer from '../containers/Dashboard/reducer';
import usersReducer from '../containers/Users/reducer';
import categoriesReducer from '../containers/Categories/reducer';

const rootReducer = combineReducers({
  request: requestReducer,
  dashboard: dashboardReducer,
  users: usersReducer,
  categories: categoriesReducer,
});

export default rootReducer;
