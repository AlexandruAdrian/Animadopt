import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  CLEAR_REGISTER_STATE,
} from './constants';

export function registerUser(data) {
  return {
    type: REGISTER_USER,
    user: data,
  };
}

export function registerUserSuccess(data) {
  return {
    type: REGISTER_USER_SUCCESS,
    data,
  };
}

export function registerUserError() {
  return {
    type: REGISTER_USER_ERROR,
  };
}

export function clearRegisterState() {
  console.log('clearing register state');
  return {
    type: CLEAR_REGISTER_STATE,
  };
}
