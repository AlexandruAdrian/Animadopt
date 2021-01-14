// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import { resetPasswordHttp } from './service';
// Actions
import { resetPasswordSuccess, resetPasswordError } from './actions';
// Constants
import { RESET_PASSWORD } from './constants';

function* resetPassSaga() {
  yield all([takeLatest(RESET_PASSWORD, resetPasswordSaga)]);
}

function* resetPasswordSaga(action) {
  try {
    const { data } = yield call(resetPasswordHttp, action);
    yield put(resetPasswordSuccess(data));
  } catch (err) {
    console.log(`Error resetting password: ${err}`);
    yield put(resetPasswordError());
  }
}

export default resetPassSaga;
