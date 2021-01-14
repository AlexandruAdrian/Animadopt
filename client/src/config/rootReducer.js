// System
import { combineReducers } from 'redux';
// Reducers
import registerReducer from '../containers/Register/reducer';
import confirmReducer from '../containers/ConfirmationPage/reducer';
import loginReducer from '../containers/Login/reducer';
import recoveryReducer from '../containers/AccountRecovery/reducer';
import passResetReducer from '../containers/PasswordReset/reducer';

const rootReducer = combineReducers({
  register: registerReducer,
  confirmation: confirmReducer,
  login: loginReducer,
  recovery: recoveryReducer,
  passReset: passResetReducer,
});

export default rootReducer;
