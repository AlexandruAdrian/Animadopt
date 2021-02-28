import { GET_USER_BAN_HISTORY_SUCCESS } from './constants';
import { BAN_USER_SUCCESS, UNBAN_USER_SUCCESS } from './constants';

const INITIAL_STATE = {
  banHistory: [],
};

const userDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_BAN_HISTORY_SUCCESS:
      return {
        banHistory: action.banHistory,
      };
    case BAN_USER_SUCCESS:
      return {
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
        banHistory: newBanHistory,
      };
    }
    default:
      return state;
  }
};

export default userDetailsReducer;
