// Constants
import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_RESET_STATE,
} from './constants';

const INITIAL_STATE = {
  response: {},
  isLoading: false,
};

export default function passResetReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_PASSWORD:
      return {
        ...state,
        isLoading: true,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        response: action.response,
        isLoading: false,
      };

    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case RESET_PASSWORD_RESET_STATE:
      return {
        response: {},
        isLoading: false,
      };

    default:
      return state;
  }
}
