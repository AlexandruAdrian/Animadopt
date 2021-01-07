// Constants
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  CLEAR_REGISTER_STATE,
} from './constants';

const INITIAL_STATE = {
  response: {},
  isLoading: false,
};

export default function registerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        response: action.data,
        isLoading: false,
      };
    }
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case CLEAR_REGISTER_STATE: {
      return {
        response: {},
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
