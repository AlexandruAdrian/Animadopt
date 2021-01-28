import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  SET_SELECTED_USER,
  RESET_USERS_STATE,
} from './constants';
import {
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
} from '../User/constants';

import { FETCH_USER_SUCCESS } from '../User/constants';

const INITIAL_STATE = {
  users: [],
  selectedUser: {},
  isLoading: false,
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROMOTE_USER:
    case DEMOTE_USER:
    case UNBAN_USER:
    case BAN_USER:
    case GET_USERS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case GET_USERS_SUCCESS: {
      return {
        users: action.users,
        isLoading: false,
      };
    }

    case UNBAN_USER_SUCCESS:
    case BAN_USER_SUCCESS: {
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          ban: action.ban,
        },
      };
    }

    case PROMOTE_USER_ERROR:
    case DEMOTE_USER_ERROR:
    case UNBAN_USER_ERROR:
    case BAN_USER_ERROR:
    case GET_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case FETCH_USER_SUCCESS:
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.user,
      };

    case PROMOTE_USER_SUCCESS:
    case DEMOTE_USER_SUCCESS:
      return {
        ...state,
        selectedUser: action.user,
      };

    case RESET_USERS_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default usersReducer;
