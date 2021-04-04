// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import { getUsersHttp } from './service';
// Actions
import { getUsersSuccess, getUsersError, setNextUsersPage } from './actions';
// Constants
import { GET_USERS } from './constants';
// Utils
import { get } from 'lodash';

function* usersSaga() {
  yield all([takeLatest(GET_USERS, getUsersSaga)]);
}

function* getUsersSaga(action) {
  try {
    const { data } = yield call(getUsersHttp, action);
    yield put(getUsersSuccess(data));
    if (get(data, 'next.page')) {
      yield put(setNextUsersPage(data.next.page));
    } else {
      yield put(setNextUsersPage(null));
    }
  } catch (err) {
    yield put(getUsersError());
  }
}

export default usersSaga;
