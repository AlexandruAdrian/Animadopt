import {
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  RESET_STATE,
} from './constants';

export function loginUser(userData) {
  return {
    type: LOGIN_USER,
    userData,
  };
}

export function loginUserSuccess(response) {
  return {
    type: LOGIN_USER_SUCCESS,
    response,
  };
}

export function loginUserError() {
  return {
    type: LOGIN_USER_ERROR,
  };
}

export function resetLoginState() {
  return {
    type: RESET_STATE,
  };
}
