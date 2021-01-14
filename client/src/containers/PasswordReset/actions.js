import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_RESET_STATE,
} from './constants';

export function resetPassword(newPassword, passwordConfirmation, code) {
  return {
    type: RESET_PASSWORD,
    code,
    newPassword,
    passwordConfirmation,
  };
}

export function resetPasswordSuccess(response) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    response,
  };
}

export function resetPasswordError() {
  return {
    type: RESET_PASSWORD_ERROR,
  };
}

export function resetPasswordResetState() {
  return {
    type: RESET_PASSWORD_RESET_STATE,
  };
}
