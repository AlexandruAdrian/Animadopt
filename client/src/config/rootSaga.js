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
import categoriesSaga from '../containers/Categories/saga';
import countiesSaga from '../containers/AddPost/saga';
import userPostsSaga from '../containers/PostsPage/saga';
import postSaga from '../containers/Post/saga';
import reviewPostsSaga from '../containers/ReviewsPage/saga';

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
    categoriesSaga(),
    countiesSaga(),
    userPostsSaga(),
    postSaga(),
    reviewPostsSaga(),
  ]);
};
export default rootSaga;
