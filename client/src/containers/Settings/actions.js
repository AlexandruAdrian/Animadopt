// Constants
import {
  UPDATE_USER_AVATAR,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from './constants';
// Toast
import { toast } from 'react-toastify';

export function updateUserAvatar(avatar) {
  return {
    type: UPDATE_USER_AVATAR,
    avatar,
  };
}

export function updateUserAvatarSuccess(newAvatar) {
  toast.success('Avatarul a fost actualizat cu success');
  return {
    type: UPDATE_USER_AVATAR_SUCCESS,
    newAvatar,
  };
}

export function updateUserAvatarError() {
  toast.error('Ooops! Am intampinat o eroare, incearca din nou');
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
  toast.success(response.message);
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    response,
  };
}

export function changePasswordError() {
  toast.error('Ooops! Se pare ca parola veche este incorecta');
  return {
    type: CHANGE_PASSWORD_ERROR,
  };
}
