// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import { getUsersHttp } from './service';
// Actions
import { getUsersSuccess, getUsersError } from './actions';
// Constants
import { GET_USERS } from './constants';

function* usersSaga() {
  yield all([takeLatest(GET_USERS, getUsersSaga)]);
}

function* getUsersSaga(action) {
  try {
    const { data } = yield call(getUsersHttp, action);
    yield put(getUsersSuccess(data.results));
  } catch (err) {
    yield put(getUsersError());
  }
}

export default usersSaga;
