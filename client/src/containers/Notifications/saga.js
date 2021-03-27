import { call, put, all, takeLatest } from 'redux-saga/effects';
import { getNotificationsHttp, markNotificationHttp } from './service';
import {
  fetchNotificationsError,
  fetchNotificationsSuccess,
  markNotificationError,
  markNotificationSuccess,
} from './actions';
import { FETCH_NOTIFICATIONS, MARK_NOTIFICATION } from './constants';

function* notificationsSaga() {
  yield all([
    takeLatest(FETCH_NOTIFICATIONS, fetchNotificationsSaga),
    takeLatest(MARK_NOTIFICATION, markNotificationSaga),
  ]);
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

export default notificationsSaga;
