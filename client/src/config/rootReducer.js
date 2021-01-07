// System
import { combineReducers } from 'redux';
// Reducers
import registerReducer from '../containers/Register/reducer';

const rootReducer = combineReducers({
  register: registerReducer,
});

export default rootReducer;
