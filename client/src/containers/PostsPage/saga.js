// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import { getUserPostsHttp } from '../Users/service';
// Actions
import { fetchUserPostsSuccess, fetchUserPostsError } from './actions';
import { setNextPostsPage } from '../User/actions';
// Constants
import { FETCH_USER_POSTS } from './constants';
// Utils
import { get } from 'lodash';

function* userPostsSaga() {
  yield all([takeLatest(FETCH_USER_POSTS, getUserPostsSaga)]);
}

function* getUserPostsSaga(action) {
  try {
    const { data } = yield call(getUserPostsHttp, action);
    yield put(fetchUserPostsSuccess(data));
    if (get(data, 'next.page')) {
      yield put(setNextPostsPage(data.next.page));
    } else {
      yield put(setNextPostsPage(null));
    }
  } catch (err) {
    yield put(fetchUserPostsError());
  }
}

export default userPostsSaga;
