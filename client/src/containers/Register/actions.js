import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from './constants';

export function registerUser(data) {
  return {
    type: REGISTER_USER,
    user: data,
  };
}

export function registerUserSuccess(response) {
  return {
    type: REGISTER_USER_SUCCESS,
    response,
  };
}

export function registerUserError() {
  return {
    type: REGISTER_USER_ERROR,
  };
}
