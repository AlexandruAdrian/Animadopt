import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  BAN_USER,
  BAN_USER_SUCCESS,
  BAN_USER_ERROR,
  UNBAN_USER,
  UNBAN_USER_SUCCESS,
  UNBAN_USER_ERROR,
} from './constants';
import { toast } from 'react-toastify';

export function fetchUser(userId) {
  return {
    type: FETCH_USER,
    userId,
  };
}

export function fetchUserSuccess(user) {
  return {
    type: FETCH_USER_SUCCESS,
    user,
  };
}

export function fetchUserError() {
  return {
    type: FETCH_USER_ERROR,
  };
}

export function banUser({ startTime, endTime, reason, userId }) {
  return {
    type: BAN_USER,
    startTime,
    endTime,
    reason,
    userId,
  };
}

export function banUserSuccess({ message, ban }) {
  toast.success(message);
  return {
    type: BAN_USER_SUCCESS,
    message,
    ban,
  };
}

export function banUserError() {
  toast.error(
    'Ooops! Am intampinat o eroare in preluarea utilizatorilor, te rugam sa incerci din nou'
  );
  return {
    type: BAN_USER_ERROR,
  };
}

export function unbanUser(userId) {
  return {
    type: UNBAN_USER,
    userId,
  };
}

export function unbanUserSuccess({ message, userId }) {
  toast.success(message);
  return {
    type: UNBAN_USER_SUCCESS,
    message,
    userId,
  };
}

export function unbanUserError() {
  toast.error(
    'Ooops! Am intampinat o eroare in deblocarea acestui utlizator, te rugam sa incerci din nou'
  );
  return {
    type: UNBAN_USER_ERROR,
  };
}
