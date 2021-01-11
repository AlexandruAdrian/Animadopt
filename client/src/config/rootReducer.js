// System
import { combineReducers } from 'redux';
// Reducers
import registerReducer from '../containers/Register/reducer';
import confirmReducer from '../containers/ConfirmationPage/reducer';
import loginReducer from '../containers/Login/reducer';

const rootReducer = combineReducers({
  register: registerReducer,
  confirmation: confirmReducer,
  login: loginReducer,
});

export default rootReducer;
