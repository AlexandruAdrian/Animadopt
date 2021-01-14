import {
  RECOVER_PASSWORD,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_ERROR,
  REQUEST_CONFIRMATION,
  REQUEST_CONFIRMATION_SUCCESS,
  REQUEST_CONFIRMATION_ERROR,
  RESET_RECOVERY_STATE,
} from './constants';

export function recoverPassword({ email }) {
  return {
    type: RECOVER_PASSWORD,
    email,
  };
}

export function recoverPasswordSuccess(data) {
  return {
    type: RECOVER_PASSWORD_SUCCESS,
    data,
  };
}

export function recoverPasswordError() {
  return {
    type: RECOVER_PASSWORD_ERROR,
  };
}

export function requestConfirmation({ email }) {
  return {
    type: REQUEST_CONFIRMATION,
    email,
  };
}

export function requestConfirmationSuccess(data) {
  return {
    type: REQUEST_CONFIRMATION_SUCCESS,
    data,
  };
}

export function requestConfirmationError() {
  return {
    type: REQUEST_CONFIRMATION_ERROR,
  };
}

export function resetRecoveryState() {
  return {
    type: RESET_RECOVERY_STATE,
  };
}
