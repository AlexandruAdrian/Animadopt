import {
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from '../../containers/Register/constants';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from '../../containers/Login/constants';
import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from '../../containers/PasswordReset/constants';
import {
  CONFIRM_ACCOUNT,
  CONFIRM_ACCOUNT_SUCCESS,
  CONFIRM_ACCOUNT_ERROR,
} from '../../containers/ConfirmationPage/constants';
import {
  RECOVER_PASSWORD,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_ERROR,
  REQUEST_CONFIRMATION,
  REQUEST_CONFIRMATION_SUCCESS,
  REQUEST_CONFIRMATION_ERROR,
} from '../../containers/AccountRecovery/constants';
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from '../../containers/Settings/constants';
import { RESET_REQUEST_STATE } from './constants';

const INITIAL_STATE = {
  response: {},
  isLoading: false,
};

const requestReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
    case RECOVER_PASSWORD:
    case REQUEST_CONFIRMATION:
    case CONFIRM_ACCOUNT:
    case RESET_PASSWORD:
    case LOGIN_USER:
    case REGISTER_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CHANGE_PASSWORD_SUCCESS:
    case CHANGE_PASSWORD_ERROR:
    case RECOVER_PASSWORD_SUCCESS:
    case RECOVER_PASSWORD_ERROR:
    case REQUEST_CONFIRMATION_SUCCESS:
    case REQUEST_CONFIRMATION_ERROR:
    case CONFIRM_ACCOUNT_SUCCESS:
    case CONFIRM_ACCOUNT_ERROR:
    case RESET_PASSWORD_SUCCESS:
    case RESET_PASSWORD_ERROR:
    case LOGIN_USER_SUCCESS:
    case LOGIN_USER_ERROR:
    case REGISTER_USER_SUCCESS:
    case REGISTER_USER_ERROR: {
      return {
        response: action.response,
        isLoading: false,
      };
    }

    case RESET_REQUEST_STATE:
      return {
        response: {},
        isLoading: false,
      };

    default:
      return state;
  }
};

export default requestReducer;
