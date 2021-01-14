// System
import { put, call, takeLatest } from 'redux-saga/effects';
// Service
import { loginUserHttp } from './service';
// Actions
import { loginUserSuccess, loginUserError } from './actions';
// Constants
import { LOGIN_USER } from './constants';
// Helpers
import { setLocalStorageItem } from '../../helpers/localStorage';

function* loginSaga() {
  yield takeLatest(LOGIN_USER, loginUserSaga);
}

function* loginUserSaga({ userData }) {
  try {
    const { data } = yield call(loginUserHttp, userData);

    if (!data.isBanned && data.token) {
      setLocalStorageItem('token', data.token);
      window.location.replace('/dashboard');
    }
    yield put(loginUserSuccess(data));
  } catch (err) {
    console.log(`Error authenticating user: ${err}`);
    yield put(loginUserError());
  }
}

export default loginSaga;
