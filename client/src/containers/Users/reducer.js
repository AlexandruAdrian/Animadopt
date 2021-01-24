import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  BAN_USER,
  BAN_USER_SUCCESS,
  BAN_USER_ERROR,
} from './constants';

const INITIAL_STATE = {
  users: [],
  isLoading: false,
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
      const newUsers = state.users.map((user) => {
        if (user._id === action.ban.forUserId) {
          user.ban = action.ban;
        }

        return user;
      });

      return {
        users: newUsers,
        isLoading: false,
      };
    }

    case BAN_USER_ERROR:
    case GET_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
