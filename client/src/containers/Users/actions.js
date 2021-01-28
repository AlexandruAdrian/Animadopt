// Constants
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  SET_SELECTED_USER,
  RESET_USERS_STATE,
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

export function setSelectedUser(user) {
  return {
    type: SET_SELECTED_USER,
    user,
  };
}

export function resetUsersState() {
  return {
    type: RESET_USERS_STATE,
  };
}
