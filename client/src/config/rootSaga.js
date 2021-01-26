// System
import { all } from 'redux-saga/effects';
// Sagas
import registerSaga from '../containers/Register/saga';
import confirmSaga from '../containers/ConfirmationPage/saga';
import loginSaga from '../containers/Login/saga';
import recoverSaga from '../containers/AccountRecovery/saga';
import resetPassSaga from '../containers/PasswordReset/saga';
import dashboardSaga from '../containers/Dashboard/saga';
import settingsSaga from '../containers/Settings/saga';
import usersSaga from '../containers/Users/saga';
import userForAdminSaga from '../containers/User/saga';

const rootSaga = function* rootSaga() {
  yield all([
    registerSaga(),
    confirmSaga(),
    loginSaga(),
    recoverSaga(),
    resetPassSaga(),
    dashboardSaga(),
    settingsSaga(),
    usersSaga(),
    userForAdminSaga(),
  ]);
};
export default rootSaga;
