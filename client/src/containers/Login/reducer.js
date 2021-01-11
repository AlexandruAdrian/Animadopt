// Constants
import { LOGIN_USER_SUCCESS, RESET_STATE } from './constants';

const INITIAL_STATE = {
  response: {},
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS: {
      return {
        response: action.response,
      };
    }

    case RESET_STATE: {
      return {
        response: {},
      };
    }

    default:
      return state;
  }
}
