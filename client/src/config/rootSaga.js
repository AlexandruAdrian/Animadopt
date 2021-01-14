// System
import { all } from 'redux-saga/effects';
// Sagas
import registerSaga from '../containers/Register/saga';
import confirmSaga from '../containers/ConfirmationPage/saga';
import loginSaga from '../containers/Login/saga';
import recoverSaga from '../containers/AccountRecovery/saga';
import resetPassSaga from '../containers/PasswordReset/saga';

const rootSaga = function* rootSaga() {
  yield all([
    registerSaga(),
    confirmSaga(),
    loginSaga(),
    recoverSaga(),
    resetPassSaga(),
  ]);
};
export default rootSaga;
