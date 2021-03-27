// System
import { put, all, call, takeLatest } from 'redux-saga/effects';
// Service
import {
  getUserHttp,
  getLocationsHttp,
  getDashboardPostsHttp,
} from './service';
// Actions
import {
  getUserSuccess,
  getUserError,
  getLocationsSuccess,
  getLocationsError,
  fetchDashboardPostsSuccess,
  setNextPostsPage,
} from './actions';
// Constants
import { GET_USER, GET_LOCATIONS, FETCH_DASHBOARD_POSTS } from './constants';
// Toastify
import { toast } from 'react-toastify';
import { fetchUserPostsError } from '../PostsPage/actions';
// Utils
import { get } from 'lodash';

function* dashboardSaga() {
  yield all([
    takeLatest(GET_USER, getUserSaga),
    takeLatest(GET_LOCATIONS, getLocationsSaga),
    takeLatest(FETCH_DASHBOARD_POSTS, getDashboardPostsSaga),
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

function* getDashboardPostsSaga(action) {
  try {
    const { data } = yield call(getDashboardPostsHttp, action);
    yield put(fetchDashboardPostsSuccess(data));
    if (get(data, 'next.page')) {
      yield put(setNextPostsPage(data.next.page));
    } else {
      yield put(setNextPostsPage(null));
    }
  } catch (err) {
    toast.error('Ooops! Am intampinat o eroare in preluarea anunturilor');
    yield put(fetchUserPostsError());
  }
}

export default dashboardSaga;
