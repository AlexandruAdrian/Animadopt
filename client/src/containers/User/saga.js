// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Services
import {
  getUserForAdminHttp,
  banUserHttp,
  unbanUserHttp,
  promoteUserHttp,
  demoteUserHttp,
  getUserBanHistoryHttp,
  getUserPostsHttp,
} from './service';
// Actions
import {
  fetchUserSuccess,
  fetchUserError,
  banUserSuccess,
  banUserError,
  unbanUserSuccess,
  unbanUserError,
  promoteUserSuccess,
  promoteUserError,
  demoteUserSuccess,
  demoteUserError,
  getUserBanHistorySuccess,
  getUserBanHistoryError,
  getUserPostsSuccess,
  getUserPostsError,
} from './actions';
// Constants
import {
  FETCH_USER,
  BAN_USER,
  UNBAN_USER,
  PROMOTE_USER,
  DEMOTE_USER,
  GET_USER_BAN_HISTORY,
  GET_USER_POSTS,
} from './constants';

function* userForAdminSaga() {
  yield all([
    takeLatest(FETCH_USER, getUserForAdminSaga),
    takeLatest(BAN_USER, banUserSaga),
    takeLatest(UNBAN_USER, unbanUserSaga),
    takeLatest(PROMOTE_USER, promoteUserSaga),
    takeLatest(DEMOTE_USER, demoteUserSaga),
    takeLatest(GET_USER_BAN_HISTORY, getUserBanHistorySaga),
    takeLatest(GET_USER_POSTS, getUserPostsSaga),
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

export function* promoteUserSaga(action) {
  try {
    const { data } = yield call(promoteUserHttp, action);
    yield put(promoteUserSuccess(data));
  } catch (err) {
    yield put(promoteUserError());
  }
}

export function* demoteUserSaga(action) {
  try {
    const { data } = yield call(demoteUserHttp, action);
    yield put(demoteUserSuccess(data));
  } catch (err) {
    yield put(demoteUserError());
  }
}

export function* getUserBanHistorySaga(action) {
  try {
    const { data } = yield call(getUserBanHistoryHttp, action);
    yield put(getUserBanHistorySuccess(data.banHistory));
  } catch (err) {
    yield put(getUserBanHistoryError());
  }
}

export function* getUserPostsSaga(action) {
  try {
    const { data } = yield call(getUserPostsHttp, action);
    yield put(getUserPostsSuccess(data.userPosts));
  } catch (err) {
    yield put(getUserPostsError());
  }
}

export default userForAdminSaga;
