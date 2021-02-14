// System
import { put, all, call, takeLatest } from 'redux-saga/effects';
// Service
import { getUserHttp, getLocationsHttp } from './service';
// Actions
import {
  getUserSuccess,
  getUserError,
  getLocationsSuccess,
  getLocationsError,
} from './actions';
// Constants
import { GET_USER, GET_LOCATIONS } from './constants';

function* dashboardSaga() {
  yield all([
    yield takeLatest(GET_USER, getUserSaga),
    yield takeLatest(GET_LOCATIONS, getLocationsSaga),
  ]);
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

function* getLocationsSaga() {
  try {
    const { data } = yield call(getLocationsHttp);
    yield put(getLocationsSuccess(data.locations));
  } catch (err) {
    console.log(`Error fetching locations: ${err}`);
    yield put(getLocationsError());
  }
}

export default dashboardSaga;
