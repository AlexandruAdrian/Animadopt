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
  PROMOTE_USER,
  PROMOTE_USER_SUCCESS,
  PROMOTE_USER_ERROR,
  DEMOTE_USER,
  DEMOTE_USER_SUCCESS,
  DEMOTE_USER_ERROR,
  GET_USER_BAN_HISTORY,
  GET_USER_BAN_HISTORY_SUCCESS,
  GET_USER_BAN_HISTORY_ERROR,
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
    'Ooops! Am intampinat o eroare in preluarea utilizatorilor, va rugam sa incercati din nou'
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

export function unbanUserSuccess({ ban, message }) {
  toast.success(message);
  return {
    type: UNBAN_USER_SUCCESS,
    ban,
    message,
  };
}

export function unbanUserError() {
  toast.error(
    'Ooops! Am intampinat o eroare in deblocarea acestui utlizator, va rugam sa incercati din nou'
  );
  return {
    type: UNBAN_USER_ERROR,
  };
}

export function promoteUser(userId) {
  return {
    type: PROMOTE_USER,
    userId,
  };
}

export function promoteUserSuccess({ message, promotedUser }) {
  toast.success(message);
  return {
    type: PROMOTE_USER_SUCCESS,
    user: promotedUser,
  };
}

export function promoteUserError() {
  toast.error(
    'Ooops! Am intampinat o eroare in promovarea acestui utilizator, va rugam sa incercati din nou'
  );
  return {
    type: PROMOTE_USER_ERROR,
  };
}

export function demoteUser(userId) {
  return {
    type: DEMOTE_USER,
    userId,
  };
}

export function demoteUserSuccess({ message, demotedUser }) {
  toast.success(message);
  return {
    type: DEMOTE_USER_SUCCESS,
    user: demotedUser,
  };
}

export function demoteUserError() {
  toast.error(
    'Ooops! Am intampinat o eroare in retrogradarea acestui utilizator, va rugam sa incercati din nou'
  );
  return {
    type: DEMOTE_USER_ERROR,
  };
}

export function getUserBanHistory(userId) {
  return {
    type: GET_USER_BAN_HISTORY,
    userId,
  };
}

export function getUserBanHistorySuccess(banHistory) {
  return {
    type: GET_USER_BAN_HISTORY_SUCCESS,
    banHistory,
  };
}

export function getUserBanHistoryError() {
  toast.error(
    'Ooops! Am intampinat o eroare in preluarea istoricului de penalizari, va rugam sa incercati din nou mai tarziu'
  );
  return {
    type: GET_USER_BAN_HISTORY_ERROR,
  };
}
