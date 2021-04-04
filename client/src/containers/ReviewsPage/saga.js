// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import { getReviewPostsHttp } from './service';
// Actions
import {
  getReviewPostsSuccess,
  getReviewPostsError,
  setNextPostsPage,
} from './actions';
// Constants
import { GET_REVIEW_POSTS } from './constants';
// Utils
import { get } from 'lodash';

function* reviewPostsSaga() {
  yield all([takeLatest(GET_REVIEW_POSTS, getReviewPostsSaga)]);
}

function* getReviewPostsSaga(action) {
  try {
    const { data } = yield call(getReviewPostsHttp, action);
    yield put(getReviewPostsSuccess(data));
    if (get(data, 'next.page')) {
      yield put(setNextPostsPage(data.next.page));
    } else {
      yield put(setNextPostsPage(null));
    }
  } catch (err) {
    console.log('err: ', err);
    yield put(getReviewPostsError());
  }
}

export default reviewPostsSaga;
