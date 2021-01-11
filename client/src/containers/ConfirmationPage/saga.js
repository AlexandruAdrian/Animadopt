// System
import { put, call, takeLatest } from 'redux-saga/effects';
// Service
import { confirmAccountHttp } from './service';
// Actions
import { confirmAccountSuccess, confirmAccountError } from './actions';
// Constants
import { CONFIRM_ACCOUNT } from './constants';

function* confirmSaga() {
  yield takeLatest(CONFIRM_ACCOUNT, confirmAccountSaga);
}

function* confirmAccountSaga({ code }) {
  try {
    const { data } = yield call(confirmAccountHttp, code);
    yield put(confirmAccountSuccess(data.message));
  } catch (err) {
    console.log(`Error confirming use account: ${err}`);
    yield put(confirmAccountError());
  }
}

export default confirmSaga;
