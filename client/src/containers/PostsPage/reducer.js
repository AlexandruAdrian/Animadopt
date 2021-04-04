// Constants
import {
  FETCH_USER_POSTS,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_ERROR,
} from './constants';
import {
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
} from '../Post/constants';
import { SET_NEXT_POSTS_PAGE } from '../User/constants';
import { get } from 'lodash';

const INITIAL_STATE = {
  posts: [],
  isLoading: false,
  nextPostsPage: 0,
};

const userPostsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_POSTS:
    case DELETE_POST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USER_POSTS_SUCCESS:
      let newPosts = [];
      if (get(action, 'data.previous')) {
        newPosts = [...state.posts, ...action.data.results];
      } else {
        newPosts = action.data.results;
      }
      return {
        ...state,
        posts: newPosts,
        isLoading: false,
      };

    case DELETE_POST_SUCCESS:
      return {
        isLoading: false,
        posts: state.posts.filter((post) => post._id !== action.postId),
      };

    case DELETE_POST_ERROR:
    case FETCH_USER_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
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

export default userPostsReducer;
