// Constants
import {
  RECOVER_PASSWORD,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_ERROR,
  REQUEST_CONFIRMATION,
  REQUEST_CONFIRMATION_SUCCESS,
  REQUEST_CONFIRMATION_ERROR,
  RESET_RECOVERY_STATE,
} from './constants';

const INITIAL_STATE = {
  response: {},
  isLoading: false,
};

export default function recoveryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECOVER_PASSWORD:
    case REQUEST_CONFIRMATION:
      return {
        ...state,
        isLoading: true,
      };
    case RECOVER_PASSWORD_SUCCESS:
    case REQUEST_CONFIRMATION_SUCCESS:
      return {
        response: action.data,
        isLoading: false,
      };

    case RESET_RECOVERY_STATE: {
      return {
        response: {},
        isLoading: false,
      };
    }
    case RECOVER_PASSWORD_ERROR:
    case REQUEST_CONFIRMATION_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
