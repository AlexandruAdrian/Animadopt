// System
import { all } from 'redux-saga/effects';
// Sagas
import registerSaga from '../containers/Register/saga';
import confirmSaga from '../containers/ConfirmationPage/saga';
import loginSaga from '../containers/Login/saga';

const rootSaga = function* rootSaga() {
  yield all([registerSaga(), confirmSaga(), loginSaga()]);
};
export default rootSaga;
