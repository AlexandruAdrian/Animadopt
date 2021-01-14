// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import { requestConfirmationHttp, requestPasswordResetHttp } from './service';
// Actions
import {
  recoverPasswordSuccess,
  requestConfirmationSuccess,
  recoverPasswordError,
  requestConfirmationError,
} from './actions';
// Constants
import { REQUEST_CONFIRMATION, RECOVER_PASSWORD } from './constants';

function* recoverSaga() {
  yield all([
    takeLatest(REQUEST_CONFIRMATION, requestConfirmationSaga),
    takeLatest(RECOVER_PASSWORD, requestPasswordResetSaga),
  ]);
}

function* requestConfirmationSaga({ email }) {
  try {
    const { data } = yield call(requestConfirmationHttp, email);
    yield put(requestConfirmationSuccess(data));
  } catch (err) {
    console.log(`Error requesting confirmation: ${err}`);
    yield put(requestConfirmationError());
  }
}

function* requestPasswordResetSaga({ email }) {
  try {
    const { data } = yield call(requestPasswordResetHttp, email);
    yield put(recoverPasswordSuccess(data));
  } catch (err) {
    console.log(`Error recovering password: ${err}`);
    yield put(recoverPasswordError());
  }
}

export default recoverSaga;
