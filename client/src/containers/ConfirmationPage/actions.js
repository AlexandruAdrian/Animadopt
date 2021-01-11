import {
  CONFIRM_ACCOUNT,
  CONFIRM_ACCOUNT_SUCCESS,
  CONFIRM_ACCOUNT_ERROR,
} from './constants';

export function confirmAccount(code) {
  return {
    type: CONFIRM_ACCOUNT,
    code,
  };
}

export function confirmAccountSuccess(response) {
  return {
    type: CONFIRM_ACCOUNT_SUCCESS,
    response,
  };
}

export function confirmAccountError() {
  return {
    type: CONFIRM_ACCOUNT_ERROR,
  };
}
