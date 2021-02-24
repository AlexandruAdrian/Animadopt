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

const INITIAL_STATE = {
  posts: [],
  isLoading: false,
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
      return {
        posts: action.posts,
        isLoading: false,
      };

    case DELETE_POST_SUCCESS:
      console.log('state: ', state);
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

    default:
      return state;
  }
};

export default userPostsReducer;
