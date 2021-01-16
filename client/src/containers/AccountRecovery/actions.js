import {
  RECOVER_PASSWORD,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_ERROR,
  REQUEST_CONFIRMATION,
  REQUEST_CONFIRMATION_SUCCESS,
  REQUEST_CONFIRMATION_ERROR,
} from './constants';

export function recoverPassword({ email }) {
  return {
    type: RECOVER_PASSWORD,
    email,
  };
}

export function recoverPasswordSuccess(response) {
  return {
    type: RECOVER_PASSWORD_SUCCESS,
    response,
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

export function requestConfirmationSuccess(response) {
  return {
    type: REQUEST_CONFIRMATION_SUCCESS,
    response,
  };
}

export function requestConfirmationError() {
  return {
    type: REQUEST_CONFIRMATION_ERROR,
  };
}
