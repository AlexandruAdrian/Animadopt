// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import { getUsersHttp, banUserHttp } from './service';
// Actions
import {
  getUsersSuccess,
  getUsersError,
  banUserSuccess,
  banUserError,
} from './actions';
// Constants
import { GET_USERS, BAN_USER } from './constants';

function* usersSaga() {
  yield all([
    takeLatest(GET_USERS, getUsersSaga),
    takeLatest(BAN_USER, banUserSaga),
  ]);
}

function* getUsersSaga(action) {
  try {
    const { data } = yield call(getUsersHttp, action);
    yield put(getUsersSuccess(data.results));
  } catch (err) {
    yield put(getUsersError());
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

export default usersSaga;
