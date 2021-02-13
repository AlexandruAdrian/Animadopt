// System
import { combineReducers } from 'redux';
// Reducers
import requestReducer from '../utils/request/requestReducer';
import dashboardReducer from '../containers/Dashboard/reducer';
import usersReducer from '../containers/Users/reducer';
import categoriesReducer from '../containers/Categories/reducer';
import countiesReducer from '../containers/AddPost/reducer';

const rootReducer = combineReducers({
  request: requestReducer,
  dashboard: dashboardReducer,
  users: usersReducer,
  categories: categoriesReducer,
  counties: countiesReducer,
});

export default rootReducer;
