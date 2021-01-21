// System
import { put, all, call, takeLatest } from 'redux-saga/effects';
// Service
import { getUserHttp } from './service';
// Actions
import { getUserSuccess, getUserError } from './actions';
// Constants
import { GET_USER } from './constants';

function* dashboardSaga() {
  yield all([yield takeLatest(GET_USER, getUserSaga)]);
}

function* getUserSaga() {
  try {
    const { data } = yield call(getUserHttp);
    yield put(getUserSuccess(data));
  } catch (err) {
    console.log(`Error fetching user: ${err}`);
    yield put(getUserError());
  }
}

export default dashboardSaga;
