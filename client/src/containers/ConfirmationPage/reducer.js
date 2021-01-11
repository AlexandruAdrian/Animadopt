// Constants
import {
  CONFIRM_ACCOUNT,
  CONFIRM_ACCOUNT_SUCCESS,
  CONFIRM_ACCOUNT_ERROR,
} from './constants';

const INITIAL_STATE = {
  response: null,
  isLoading: false,
};

export default function confirmReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONFIRM_ACCOUNT:
      return {
        ...state,
        isLoading: true,
      };
    case CONFIRM_ACCOUNT_SUCCESS:
      return {
        response: action.response,
        isLoading: false,
      };
    case CONFIRM_ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
