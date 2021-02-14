import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_LOCATIONS,
  GET_LOCATIONS_ERROR,
  GET_LOCATIONS_SUCCESS,
} from './constants';
import { UPDATE_USER_AVATAR_SUCCESS } from '../Settings/constants';

const INITIAL_STATE = {
  user: {},
  locations: [],
  isLoading: false,
};

const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
    case GET_LOCATIONS:
      return {
        ...state,
        isLoading: true,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.user.user,
        isLoading: false,
      };

    case GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.locations,
        isLoading: false,
      };

    case GET_USER_ERROR:
    case GET_LOCATIONS_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case UPDATE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.newAvatar,
        },
      };

    default:
      return state;
  }
};

export default dashboardReducer;
