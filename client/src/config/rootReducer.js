// System
import { combineReducers } from 'redux';
// Reducers
import requestReducer from '../utils/request/requestReducer';

const rootReducer = combineReducers({
  request: requestReducer,
});

export default rootReducer;
