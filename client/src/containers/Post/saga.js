// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Actions
import {
  getPostSuccess,
  getPostError,
  deletePostSuccess,
  deletePostError,
  updatePostSuccess,
  updatePostError,
} from './actions';
// Constants
import { STATUS_APPROVED, STATUS_REJECTED } from '../PostsPage/constants';
import {
  GET_POST,
  DELETE_POST,
  UPDATE_POST_STATUS,
  MARK_AS_ADOPTED,
  UPDATE_POST,
} from './constants';
// Service
import {
  getPostHttp,
  deletePostHttp,
  updatePostStatus,
  markAsAdopted,
  updatePostHttp,
} from './service';
import { toast } from 'react-toastify';

function* postSaga() {
  yield all([
    takeLatest(GET_POST, getPostSaga),
    takeLatest(DELETE_POST, deletePostSaga),
    takeLatest(UPDATE_POST_STATUS, updatePostStatusSaga),
    takeLatest(MARK_AS_ADOPTED, markAsAdoptedSaga),
    takeLatest(UPDATE_POST, updatePostSaga),
  ]);
}

function* getPostSaga({ postId }) {
  try {
    const { data } = yield call(getPostHttp, postId);
    yield put(getPostSuccess(data.post));
  } catch (err) {
    yield put(getPostError());
  }
}

function* deletePostSaga({ postId, history }) {
  try {
    const { data } = yield call(deletePostHttp, postId);
    console.log('data: ', data);
    console.log('history: ', history);
    yield put(deletePostSuccess(data));
    history.push('/dashboard/posts');
  } catch (err) {
    console.log('error: ', err);
    yield put(deletePostError());
  }
}

function* updatePostStatusSaga(action) {
  try {
    const { data } = yield call(updatePostStatus, action);
    const { history } = action;
    if (data.updatedPost.status === STATUS_APPROVED) {
      toast.success('Postarea a fost acceptata');
    } else if (data.updatedPost.status === STATUS_REJECTED) {
      toast.success('Postarea a fost respinsa');
    }
    history.push('/dashboard/reviews');
  } catch (err) {
    console.log('errr: ', err);
    toast.error(
      'Ooops! Am intampinat o eroare, va rugam incercati din nou mai tarziu'
    );
  }
}

function* markAsAdoptedSaga(action) {
  try {
    const { data } = yield call(markAsAdopted, action);
    const { history } = action;
    toast.success(data.message);
    history.push('/dashboard/posts');
  } catch (err) {
    toast.error(
      'Ooops! Am intampinat o eroare, va rugam incercati din nou mai tarziu'
    );
  }
}

function* updatePostSaga(action) {
  try {
    const { data } = yield call(updatePostHttp, action);
    const { history } = action;
    yield put(updatePostSuccess(data.updatedPost, data.message));
    history.push('/dashboard/posts');
  } catch (err) {
    yield put(updatePostError());
  }
}

export default postSaga;
