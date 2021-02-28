import {
  GET_USER_BAN_HISTORY_SUCCESS,
  BAN_USER_SUCCESS,
  UNBAN_USER_SUCCESS,
  GET_USER_POSTS_SUCCESS,
} from './constants';

const INITIAL_STATE = {
  banHistory: [],
  userPosts: [],
};

const userDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_BAN_HISTORY_SUCCESS:
      return {
        ...state,
        banHistory: action.banHistory,
      };
    case BAN_USER_SUCCESS:
      return {
        ...state,
        banHistory: [action.ban, ...state.banHistory],
      };
    case UNBAN_USER_SUCCESS: {
      const newBanHistory = state.banHistory.map((ban) => {
        if (ban._id === action.ban._id) {
          ban.isValid = action.ban.isValid;
        }
        return ban;
      });

      return {
        ...state,
        banHistory: newBanHistory,
      };
    }
    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        userPosts: action.posts,
      };
    default:
      return state;
  }
};

export default userDetailsReducer;
