// System
import { put, call, takeLatest } from 'redux-saga/effects';
// Service
import { loginUserHttp } from './service';
// Actions
import { loginUserSuccess, loginUserError } from './actions';
// Constants
import { LOGIN_USER } from './constants';

function* loginSaga() {
  yield takeLatest(LOGIN_USER, loginUserSaga);
}

function* loginUserSaga({ userData }) {
  try {
    const response = yield call(loginUserHttp, userData);

    yield put(loginUserSuccess(response.data));
  } catch (err) {
    console.log(`Error authenticating user: ${err}`);
    yield put(loginUserError());
  }
}

export default loginSaga;
