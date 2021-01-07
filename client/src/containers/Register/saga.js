// System
import { put, call, takeLatest } from 'redux-saga/effects';
// Service
import { registerUserHttp } from './service';
// Actions
import { registerUserSuccess, registerUserError } from './actions';
// Constants
import { REGISTER_USER } from './constants';

function* registerSaga() {
  yield takeLatest(REGISTER_USER, registerUserSaga);
}

function* registerUserSaga({ user }) {
  try {
    const response = yield call(registerUserHttp, user);
    yield put(registerUserSuccess(response.data));
  } catch (err) {
    console.log(`Error registering user: ${err}`);
    yield put(registerUserError());
  }
}

export default registerSaga;
