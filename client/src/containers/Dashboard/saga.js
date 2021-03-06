// System
import { put, all, call, takeLatest } from 'redux-saga/effects';
// Service
import {
  getUserHttp,
  getLocationsHttp,
  getDashboardPostsHttp,
  getNotificationsHttp,
  markNotificationHttp,
} from './service';
// Actions
import {
  getUserSuccess,
  getUserError,
  getLocationsSuccess,
  getLocationsError,
  fetchDashboardPostsSuccess,
  fetchNotificationsSuccess,
  fetchNotificationsError,
  markNotificationSuccess,
  markNotificationError,
} from './actions';
// Constants
import {
  GET_USER,
  GET_LOCATIONS,
  FETCH_DASHBOARD_POSTS,
  FETCH_NOTIFICATIONS,
  MARK_NOTIFICATION,
} from './constants';
// Toastify
import { toast } from 'react-toastify';
import { fetchUserPostsError } from '../PostsPage/actions';

function* dashboardSaga() {
  yield all([
    takeLatest(GET_USER, getUserSaga),
    takeLatest(GET_LOCATIONS, getLocationsSaga),
    takeLatest(FETCH_DASHBOARD_POSTS, getDashboardPostsSaga),
    takeLatest(FETCH_NOTIFICATIONS, fetchNotificationsSaga),
    takeLatest(MARK_NOTIFICATION, markNotificationSaga),
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
    yield put(fetchDashboardPostsSuccess(data.results));
  } catch (err) {
    toast.error('Ooops! Am intampinat o eroare in preluarea anunturilor');
    yield put(fetchUserPostsError());
  }
}

function* fetchNotificationsSaga(action) {
  try {
    const { data } = yield call(getNotificationsHttp, action);
    yield put(fetchNotificationsSuccess(data.notifications));
  } catch (err) {
    yield put(fetchNotificationsError());
  }
}

function* markNotificationSaga(action) {
  try {
    const { data } = yield call(markNotificationHttp, action);
    yield put(markNotificationSuccess(data.notification));
  } catch (err) {
    yield put(markNotificationError());
  }
}

export default dashboardSaga;
