import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_LOCATIONS,
  GET_LOCATIONS_ERROR,
  GET_LOCATIONS_SUCCESS,
  SET_SELECTED_POST,
  FETCH_DASHBOARD_POSTS,
  FETCH_DASHBOARD_POSTS_SUCCESS,
  FETCH_DASHBOARD_POSTS_ERROR,
  RESET_DASHBOARD,
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_ERROR,
  MARK_NOTIFICATION_SUCCESS,
} from './constants';
import { GET_POST_SUCCESS } from '../Post/constants';
import { UPDATE_USER_AVATAR_SUCCESS } from '../Settings/constants';

const INITIAL_STATE = {
  user: {},
  locations: [],
  selectedPost: {},
  isLoading: false,
  notifications: [],
  posts: [],
};

const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
    case GET_LOCATIONS:
    case FETCH_DASHBOARD_POSTS:
    case FETCH_NOTIFICATIONS:
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

    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.notifications,
        isLoading: false,
      };

    case MARK_NOTIFICATION_SUCCESS:
      const newNotifications = action.notifications.map((notification) => {
        if (notification._id === action.notification._id) {
          return action.notification;
        }

        return notification;
      });
      return {
        ...state,
        notifications: newNotifications,
      };

    case FETCH_NOTIFICATIONS_ERROR:
    case GET_USER_ERROR:
    case GET_LOCATIONS_ERROR:
    case FETCH_DASHBOARD_POSTS_ERROR:
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

    case GET_POST_SUCCESS:
    case SET_SELECTED_POST:
      return {
        ...state,
        selectedPost: action.post,
      };

    case FETCH_DASHBOARD_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.posts],
      };

    case RESET_DASHBOARD:
      return {
        ...state,
        posts: [],
      };

    default:
      return state;
  }
};

export default dashboardReducer;
