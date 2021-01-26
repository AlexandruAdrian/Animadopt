import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  SET_SELECTED_USER,
} from './constants';
import {
  BAN_USER,
  BAN_USER_SUCCESS,
  BAN_USER_ERROR,
  UNBAN_USER,
  UNBAN_USER_SUCCESS,
  UNBAN_USER_ERROR,
} from '../User/constants';

import { FETCH_USER_SUCCESS } from '../User/constants';

const INITIAL_STATE = {
  users: [],
  selectedUser: {},
  isLoading: false,
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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

    case BAN_USER_SUCCESS: {
      let bannedUser = {};

      const usersAfterBan = state.users.map((user) => {
        if (user._id === action.ban.forUserId) {
          user.ban = action.ban;
          bannedUser = { ...user };
        }

        return user;
      });

      return {
        users: usersAfterBan,
        isLoading: false,
        selectedUser: bannedUser,
      };
    }

    case UNBAN_USER_SUCCESS: {
      let unbannedUser = {};
      const usersAfterUnban = state.users.map((user) => {
        if (user._id === action.userId) {
          user.ban = null;
          unbannedUser = { ...user };
        }

        return user;
      });

      return {
        users: usersAfterUnban,
        isLoading: false,
        selectedUser: unbannedUser,
      };
    }

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

    default:
      return state;
  }
};

export default usersReducer;
