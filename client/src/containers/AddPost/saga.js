// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import { fetchCountiesHttp, addPostHttp } from './service';
// Actions
import {
  fetchCountiesSuccess,
  fetchCountiesError,
  addPostSuccess,
  addPostError,
} from './actions';
// Constants
import { FETCH_COUNTIES, ADD_POST } from './constants';

function* countiesSaga() {
  yield all([
    takeLatest(FETCH_COUNTIES, fetchCountiesSaga),
    takeLatest(ADD_POST, addPostSaga),
  ]);
}

function* fetchCountiesSaga() {
  try {
    const { data } = yield call(fetchCountiesHttp);
    yield put(fetchCountiesSuccess(data));
  } catch (err) {
    yield put(fetchCountiesError());
  }
}

function* addPostSaga(action) {
  try {
    const { data } = yield call(addPostHttp, action);
    yield put(addPostSuccess(data));
  } catch (err) {
    yield put(addPostError());
  }
}

export default countiesSaga;
