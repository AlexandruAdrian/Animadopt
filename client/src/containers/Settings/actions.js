import {
  UPDATE_USER_AVATAR,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from './constants';

export function updateUserAvatar(avatar) {
  return {
    type: UPDATE_USER_AVATAR,
    avatar,
  };
}

export function updateUserAvatarSuccess(newAvatar) {
  return {
    type: UPDATE_USER_AVATAR_SUCCESS,
    newAvatar,
  };
}

export function updateUserAvatarError() {
  return {
    type: UPDATE_USER_AVATAR_ERROR,
  };
}

export function changePassword(oldPassword, password, passwordConfirmation) {
  return {
    type: CHANGE_PASSWORD,
    oldPassword,
    password,
    passwordConfirmation,
  };
}

export function changePasswordSuccess(response) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    response,
  };
}

export function changePasswordError() {
  return {
    type: CHANGE_PASSWORD_ERROR,
  };
}
