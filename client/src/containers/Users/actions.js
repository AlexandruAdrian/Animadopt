// Constants
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  BAN_USER,
  BAN_USER_SUCCESS,
  BAN_USER_ERROR,
} from './constants';
// Tostify
import { toast } from 'react-toastify';

export function getUsers({ page, searchTerm, role, userId }) {
  return {
    type: GET_USERS,
    userId,
    page,
    searchTerm,
    role,
  };
}

export function getUsersSuccess(users) {
  return {
    type: GET_USERS_SUCCESS,
    users,
  };
}

export function getUsersError() {
  toast.error(
    'Ooops! Am intampinat o eroare in preluarea utilizatorilor, te rugam sa incerci din nou'
  );
  return {
    type: GET_USERS_ERROR,
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
