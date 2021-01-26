// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import { getUserForAdminHttp, banUserHttp, unbanUserHttp } from './service';
// Actions
import {
  fetchUserSuccess,
  fetchUserError,
  banUserSuccess,
  banUserError,
  unbanUserSuccess,
  unbanUserError,
} from './actions';
// Constants
import { FETCH_USER, BAN_USER, UNBAN_USER } from './constants';

function* userForAdminSaga() {
  yield all([
    takeLatest(FETCH_USER, getUserForAdminSaga),
    takeLatest(BAN_USER, banUserSaga),
    takeLatest(UNBAN_USER, unbanUserSaga),
  ]);
}

function* getUserForAdminSaga(action) {
  try {
    const { data } = yield call(getUserForAdminHttp, action);
    yield put(fetchUserSuccess(data.user));
  } catch {
    yield put(fetchUserError());
  }
}

export function* banUserSaga(action) {
  try {
    const { data } = yield call(banUserHttp, action);
    yield put(banUserSuccess(data));
  } catch (err) {
    yield put(banUserError());
  }
}

export function* unbanUserSaga(action) {
  try {
    const { data } = yield call(unbanUserHttp, action);
    yield put(unbanUserSuccess(data));
  } catch (err) {
    yield put(unbanUserError());
  }
}

export default userForAdminSaga;
