// Constants
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  SET_SELECTED_USER,
  RESET_USERS_STATE,
  SET_NEXT_USERS_PAGE,
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

export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
}

export function getUsersError() {
  toast.error(
    'Ooops! Am intampinat o eroare in preluarea utilizatorilor, va rugam incercati din nou mai tarziu'
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

export function setNextUsersPage(nextPage) {
  return {
    type: SET_NEXT_USERS_PAGE,
    nextPage,
  };
}
