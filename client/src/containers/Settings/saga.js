// System
import { put, call, all, takeLatest } from 'redux-saga/effects';
// Service
import { updateUserAvatarHttp, changeUserPasswordHttp } from './service';
// Actions
import {
  updateUserAvatarSuccess,
  updateUserAvatarError,
  changePasswordSuccess,
  changePasswordError,
} from './actions';
// Constants
import { UPDATE_USER_AVATAR, CHANGE_PASSWORD } from './constants';

function* settingsSaga() {
  yield all([
    takeLatest(UPDATE_USER_AVATAR, updateUserAvatarSaga),
    takeLatest(CHANGE_PASSWORD, changeUserPasswordSaga),
  ]);
}

function* updateUserAvatarSaga(avatar) {
  try {
    const { data } = yield call(updateUserAvatarHttp, avatar);
    yield put(updateUserAvatarSuccess(data.newAvatar));
  } catch (err) {
    console.log(`Error updating user avatar: ${err}`);
    yield put(updateUserAvatarError());
  }
}

function* changeUserPasswordSaga(action) {
  try {
    const { data } = yield call(changeUserPasswordHttp, action);
    yield put(changePasswordSuccess(data));
  } catch (err) {
    yield put(changePasswordError(err));
  }
}

export default settingsSaga;
