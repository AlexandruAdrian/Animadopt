// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import { getUserPostsHttp } from '../Users/service';
// Actions
import { fetchUserPostsSuccess, fetchUserPostsError } from './actions';
// Constants
import { FETCH_USER_POSTS } from './constants';

function* userPostsSaga() {
  yield all([takeLatest(FETCH_USER_POSTS, getUserPostsSaga)]);
}

function* getUserPostsSaga(action) {
  try {
    const { data } = yield call(getUserPostsHttp, action);
    console.log('data: ', data);
    yield put(fetchUserPostsSuccess(data));
  } catch (err) {
    yield put(fetchUserPostsError());
  }
}

export default userPostsSaga;
