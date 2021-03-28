// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import { getReviewPostsHttp } from './service';
// Actions
import { getReviewPostsSuccess, getReviewPostsError } from './actions';
// Constants
import { GET_REVIEW_POSTS } from './constants';

function* reviewPostsSaga() {
  yield all([takeLatest(GET_REVIEW_POSTS, getReviewPostsSaga)]);
}

function* getReviewPostsSaga(action) {
  try {
    const { data } = yield call(getReviewPostsHttp, action);
    yield put(getReviewPostsSuccess(data.results));
  } catch (err) {
    console.log('err: ', err);
    yield put(getReviewPostsError());
  }
}

export default reviewPostsSaga;
