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
  SET_NEXT_POSTS_PAGE,
} from './constants';
import { GET_POST_SUCCESS } from '../Post/constants';
import { UPDATE_USER_AVATAR_SUCCESS } from '../Settings/constants';
import { get } from 'lodash';

const INITIAL_STATE = {
  user: {},
  locations: [],
  selectedPost: {},
  isLoading: false,
  posts: [],
  nextPostsPage: 0,
};

const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
    case GET_LOCATIONS:
    case FETCH_DASHBOARD_POSTS:
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
      let newPosts = [];
      if (get(action, 'data.previous')) {
        newPosts = [...state.posts, ...action.data.results];
      } else {
        newPosts = action.data.results;
      }

      return {
        ...state,
        posts: newPosts,
      };

    case SET_NEXT_POSTS_PAGE:
      return {
        ...state,
        nextPostsPage: action.nextPage,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
